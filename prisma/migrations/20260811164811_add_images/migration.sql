-- AlterTable
ALTER TABLE "Driver" ADD COLUMN "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "NewsArticle" ADD COLUMN "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN "imageUrl" TEXT;

-- CreateTable
CREATE TABLE "Banner" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slot" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "linkUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
