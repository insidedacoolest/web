-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_NewsArticle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "badge" TEXT NOT NULL,
    "badgePink" BOOLEAN NOT NULL DEFAULT false,
    "icon" TEXT NOT NULL DEFAULT 'target',
    "grad" INTEGER NOT NULL DEFAULT 1,
    "catsCsv" TEXT NOT NULL,
    "dateLabel" TEXT NOT NULL,
    "publishedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_NewsArticle" ("badge", "badgePink", "catsCsv", "createdAt", "dateLabel", "excerpt", "grad", "id", "publishedAt", "title", "updatedAt") SELECT "badge", "badgePink", "catsCsv", "createdAt", "dateLabel", "excerpt", "grad", "id", "publishedAt", "title", "updatedAt" FROM "NewsArticle";
DROP TABLE "NewsArticle";
ALTER TABLE "new_NewsArticle" RENAME TO "NewsArticle";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
