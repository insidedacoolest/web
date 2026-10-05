-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_NewsArticle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "titleEn" TEXT,
    "titleEs" TEXT,
    "titleFr" TEXT,
    "excerpt" TEXT NOT NULL,
    "excerptEn" TEXT,
    "excerptEs" TEXT,
    "excerptFr" TEXT,
    "body" TEXT NOT NULL DEFAULT '',
    "bodyEn" TEXT,
    "bodyEs" TEXT,
    "bodyFr" TEXT,
    "badge" TEXT NOT NULL,
    "badgePink" BOOLEAN NOT NULL DEFAULT false,
    "icon" TEXT NOT NULL DEFAULT 'target',
    "grad" INTEGER NOT NULL DEFAULT 1,
    "catsCsv" TEXT NOT NULL,
    "dateLabel" TEXT NOT NULL,
    "imageUrl" TEXT,
    "publishedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_NewsArticle" ("badge", "badgePink", "catsCsv", "createdAt", "dateLabel", "excerpt", "excerptEn", "excerptEs", "excerptFr", "grad", "icon", "id", "imageUrl", "publishedAt", "title", "titleEn", "titleEs", "titleFr", "updatedAt") SELECT "badge", "badgePink", "catsCsv", "createdAt", "dateLabel", "excerpt", "excerptEn", "excerptEs", "excerptFr", "grad", "icon", "id", "imageUrl", "publishedAt", "title", "titleEn", "titleEs", "titleFr", "updatedAt" FROM "NewsArticle";
DROP TABLE "NewsArticle";
ALTER TABLE "new_NewsArticle" RENAME TO "NewsArticle";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
