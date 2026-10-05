-- DropTable
DROP TABLE "ResultRow";

-- RedefineTable
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ResultRound" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "champCode" TEXT NOT NULL,
    "eyebrow" TEXT NOT NULL,
    "eyebrowPink" BOOLEAN NOT NULL DEFAULT false,
    "rounds" INTEGER NOT NULL DEFAULT 1,
    "col3Label" TEXT NOT NULL DEFAULT 'País',
    "rowsJson" TEXT NOT NULL DEFAULT '[]',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
DROP TABLE "ResultRound";
ALTER TABLE "new_ResultRound" RENAME TO "ResultRound";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
