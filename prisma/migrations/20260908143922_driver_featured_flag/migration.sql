-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Driver" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "num" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "team" TEXT NOT NULL,
    "car" TEXT NOT NULL,
    "power" INTEGER NOT NULL,
    "nationality" TEXT NOT NULL,
    "flag" TEXT NOT NULL,
    "birthDate" TEXT NOT NULL,
    "born" TEXT NOT NULL,
    "catsCsv" TEXT NOT NULL,
    "champsCsv" TEXT NOT NULL,
    "standing" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "bestStanding" INTEGER NOT NULL,
    "wins" INTEGER NOT NULL,
    "podiums" INTEGER NOT NULL,
    "bio" TEXT NOT NULL,
    "bioEn" TEXT,
    "bioEs" TEXT,
    "bioFr" TEXT,
    "instagram" TEXT NOT NULL,
    "historyJson" TEXT NOT NULL,
    "imageUrl" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Driver" ("bestStanding", "bio", "bioEn", "bioEs", "bioFr", "birthDate", "born", "car", "catsCsv", "champsCsv", "createdAt", "firstName", "flag", "historyJson", "id", "imageUrl", "instagram", "lastName", "nationality", "num", "podiums", "points", "power", "slug", "standing", "team", "updatedAt", "wins") SELECT "bestStanding", "bio", "bioEn", "bioEs", "bioFr", "birthDate", "born", "car", "catsCsv", "champsCsv", "createdAt", "firstName", "flag", "historyJson", "id", "imageUrl", "instagram", "lastName", "nationality", "num", "podiums", "points", "power", "slug", "standing", "team", "updatedAt", "wins" FROM "Driver";
DROP TABLE "Driver";
ALTER TABLE "new_Driver" RENAME TO "Driver";
CREATE UNIQUE INDEX "Driver_slug_key" ON "Driver"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
