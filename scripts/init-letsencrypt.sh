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
docker compose up -d nginx
sleep 5

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
docker compose exec nginx nginx -s reload

docker compose up -d certbot
echo "### Done: https://$PRIMARY"
