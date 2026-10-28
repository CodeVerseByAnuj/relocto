-- CreateEnum
CREATE TYPE "PriceRequestStatus" AS ENUM ('NEW', 'SENT', 'CLOSED');

-- CreateTable
CREATE TABLE "PriceRequest" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "fromLabel" TEXT NOT NULL,
    "toLabel" TEXT NOT NULL,
    "km" DOUBLE PRECISION NOT NULL,
    "items" JSONB NOT NULL,
    "itemsTotal" INTEGER NOT NULL,
    "distanceCharge" INTEGER NOT NULL,
    "estimate" INTEGER NOT NULL,
    "finalPrice" INTEGER,
    "notes" TEXT,
    "status" "PriceRequestStatus" NOT NULL DEFAULT 'NEW',
    "sentAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PriceRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PriceRequest_token_key" ON "PriceRequest"("token");

-- CreateIndex
CREATE INDEX "PriceRequest_status_createdAt_idx" ON "PriceRequest"("status", "createdAt");
