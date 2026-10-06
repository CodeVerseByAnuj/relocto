-- CreateTable
CREATE TABLE "AboutPage" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "heroDescription" TEXT,
    "heroImageUrl" TEXT,
    "introEyebrow" TEXT,
    "introHeading" TEXT,
    "introBody" TEXT,
    "introImageUrl" TEXT,
    "content" TEXT,
    "timelineTitle" TEXT,
    "timeline" JSONB NOT NULL DEFAULT '[]',
    "valuesTitle" TEXT,
    "values" JSONB NOT NULL DEFAULT '[]',
    "vision" TEXT,
    "mission" TEXT,
    "statsTitle" TEXT,
    "stats" JSONB NOT NULL DEFAULT '[]',
    "logosTitle" TEXT,
    "logos" JSONB NOT NULL DEFAULT '[]',
    "showTestimonials" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AboutPage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AboutPage_slug_key" ON "AboutPage"("slug");

-- CreateIndex
CREATE INDEX "AboutPage_published_order_idx" ON "AboutPage"("published", "order");
