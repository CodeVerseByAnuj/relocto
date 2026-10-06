-- CreateTable
CREATE TABLE "AppliedSeed" (
    "key" TEXT NOT NULL,
    "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AppliedSeed_pkey" PRIMARY KEY ("key")
);
