#!/bin/sh
# One-time Let's Encrypt setup for the Nginx reverse proxy.
#
# Nginx refuses to start without a certificate, and Let's Encrypt needs Nginx
# running to verify the domain. So: start Nginx with a throwaway self-signed
# cert, request the real one through it, then reload Nginx.
#
# Run from the project root on the server:
#   sh scripts/init-letsencrypt.sh [email]
# After this, the certbot service renews certificates automatically.

set -e

DOMAINS="relocato.in www.relocato.in"
PRIMARY="relocato.in"
EMAIL="${1:-}"
LIVE="/etc/letsencrypt/live/$PRIMARY"

if docker compose run --rm --entrypoint "test -s $LIVE/fullchain.pem" certbot 2>/dev/null \
  && ! docker compose run --rm --entrypoint "grep -q dummy $LIVE/README.dummy" certbot 2>/dev/null; then
  echo "Certificate for $PRIMARY already exists; nothing to do."
  exit 0
fi

echo "### Creating temporary self-signed certificate ..."
docker compose run --rm --entrypoint "sh -c '\
  mkdir -p $LIVE && \
  openssl req -x509 -nodes -newkey rsa:2048 -days 1 \
    -keyout $LIVE/privkey.pem -out $LIVE/fullchain.pem -subj /CN=localhost && \
  echo dummy > $LIVE/README.dummy'" certbot

echo "### Starting nginx ..."
# Recreate so a container stuck in a restart loop (no cert yet) starts fresh
# with the temporary cert instead of waiting out its backoff.
docker compose up -d --force-recreate nginx

# Nginx must be up and serving port 80 before the temporary cert is removed:
# it keeps the loaded cert in memory, but a restart after removal would fail.
tries=0
until docker compose exec -T nginx wget -q -O /dev/null "http://localhost/.well-known/acme-challenge/ping" 2>&1 | grep -q "404"; do
  tries=$((tries + 1))
  if [ "$tries" -ge 30 ]; then
    echo "nginx did not start; check: docker compose logs nginx" >&2
    exit 1
  fi
  sleep 2
done
echo "nginx is up."

echo "### Removing temporary certificate ..."
docker compose run --rm --entrypoint "rm -rf \
  /etc/letsencrypt/live/$PRIMARY \
  /etc/letsencrypt/archive/$PRIMARY \
  /etc/letsencrypt/renewal/$PRIMARY.conf" certbot

echo "### Requesting Let's Encrypt certificate ..."
DOMAIN_ARGS=""
for d in $DOMAINS; do DOMAIN_ARGS="$DOMAIN_ARGS -d $d"; done

if [ -n "$EMAIL" ]; then
  EMAIL_ARG="--email $EMAIL"
else
  EMAIL_ARG="--register-unsafely-without-email"
fi

docker compose run --rm --entrypoint "certbot certonly --webroot -w /var/www/certbot \
  $DOMAIN_ARGS $EMAIL_ARG --agree-tos --non-interactive" certbot

echo "### Reloading nginx ..."
docker compose exec -T nginx nginx -s reload

docker compose up -d certbot
echo "### Done: https://$PRIMARY"
