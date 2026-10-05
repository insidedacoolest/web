-- CreateTable
CREATE TABLE "VirtualSession" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "discordUrl" TEXT,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "VirtualCalendarEvent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "label" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "style" TEXT NOT NULL DEFAULT 'fill',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
