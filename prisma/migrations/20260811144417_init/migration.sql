-- CreateTable
CREATE TABLE "Driver" (
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
    "instagram" TEXT NOT NULL,
    "historyJson" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "NewsArticle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "badge" TEXT NOT NULL,
    "badgePink" BOOLEAN NOT NULL DEFAULT false,
    "grad" INTEGER NOT NULL DEFAULT 1,
    "catsCsv" TEXT NOT NULL,
    "dateLabel" TEXT NOT NULL,
    "publishedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "oldPrice" REAL,
    "catsCsv" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "color" TEXT NOT NULL DEFAULT 'lime',
    "grad" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Championship" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "rounds" INTEGER NOT NULL,
    "scope" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "StandingEntry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "champCode" TEXT NOT NULL,
    "pos" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "team" TEXT NOT NULL,
    "car" TEXT NOT NULL,
    "points" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "ResultRound" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "champCode" TEXT NOT NULL,
    "eyebrow" TEXT NOT NULL,
    "eyebrowPink" BOOLEAN NOT NULL DEFAULT false,
    "place" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "col3Label" TEXT NOT NULL DEFAULT 'Equipa',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "ResultRow" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "resultRoundId" INTEGER NOT NULL,
    "pos" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "teamOrCountry" TEXT NOT NULL,
    "car" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    CONSTRAINT "ResultRow_resultRoundId_fkey" FOREIGN KEY ("resultRoundId") REFERENCES "ResultRound" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CalendarEvent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "month" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "fullDate" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "LeaderboardEntry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pos" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "score" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Driver_slug_key" ON "Driver"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Championship_code_key" ON "Championship"("code");

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");
