-- DropTable
DROP TABLE "Service";

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "heroBadge" TEXT NOT NULL,
    "heroTitle" TEXT NOT NULL,
    "heroDescription" TEXT NOT NULL,
    "heroPrimaryCtaLabel" TEXT NOT NULL DEFAULT 'Get a Free Quote',
    "heroPrimaryCtaHref" TEXT NOT NULL DEFAULT '#contact',
    "heroPhone" TEXT,
    "heroImageUrl" TEXT,
    "servicesEyebrow" TEXT NOT NULL,
    "servicesTitle" TEXT NOT NULL,
    "servicesDescription" TEXT NOT NULL,
    "areasTitle" TEXT NOT NULL,
    "areasDescription" TEXT NOT NULL,
    "areas" TEXT[],
    "whyTitle" TEXT NOT NULL,
    "whyHighlight" TEXT,
    "quoteBadge" TEXT NOT NULL,
    "quoteHeading" TEXT NOT NULL,
    "quoteDescription" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LocationService" (
    "id" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "icon" TEXT,
    "imageUrl" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "features" TEXT[],

    CONSTRAINT "LocationService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LocationFeature" (
    "id" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "icon" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "LocationFeature_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Location_slug_key" ON "Location"("slug");

-- CreateIndex
CREATE INDEX "Location_published_order_idx" ON "Location"("published", "order");

-- CreateIndex
CREATE INDEX "LocationService_locationId_order_idx" ON "LocationService"("locationId", "order");

-- CreateIndex
CREATE INDEX "LocationFeature_locationId_order_idx" ON "LocationFeature"("locationId", "order");

-- AddForeignKey
ALTER TABLE "LocationService" ADD CONSTRAINT "LocationService_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocationFeature" ADD CONSTRAINT "LocationFeature_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

