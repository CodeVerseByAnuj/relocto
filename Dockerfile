FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# Prisma schema is needed by npm ci's postinstall
COPY prisma ./prisma

RUN npm ci

COPY . .

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

RUN npm run build

EXPOSE 3000

# Apply pending migrations (DB is only reachable at runtime), then start
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start"]