-- AlterTable
ALTER TABLE "CalendarEvent" ADD COLUMN "descEn" TEXT;
ALTER TABLE "CalendarEvent" ADD COLUMN "descEs" TEXT;
ALTER TABLE "CalendarEvent" ADD COLUMN "descFr" TEXT;
ALTER TABLE "CalendarEvent" ADD COLUMN "titleEn" TEXT;
ALTER TABLE "CalendarEvent" ADD COLUMN "titleEs" TEXT;
ALTER TABLE "CalendarEvent" ADD COLUMN "titleFr" TEXT;

-- AlterTable
ALTER TABLE "Championship" ADD COLUMN "descEn" TEXT;
ALTER TABLE "Championship" ADD COLUMN "descEs" TEXT;
ALTER TABLE "Championship" ADD COLUMN "descFr" TEXT;
ALTER TABLE "Championship" ADD COLUMN "nameEn" TEXT;
ALTER TABLE "Championship" ADD COLUMN "nameEs" TEXT;
ALTER TABLE "Championship" ADD COLUMN "nameFr" TEXT;

-- AlterTable
ALTER TABLE "Driver" ADD COLUMN "bioEn" TEXT;
ALTER TABLE "Driver" ADD COLUMN "bioEs" TEXT;
ALTER TABLE "Driver" ADD COLUMN "bioFr" TEXT;

-- AlterTable
ALTER TABLE "NewsArticle" ADD COLUMN "excerptEn" TEXT;
ALTER TABLE "NewsArticle" ADD COLUMN "excerptEs" TEXT;
ALTER TABLE "NewsArticle" ADD COLUMN "excerptFr" TEXT;
ALTER TABLE "NewsArticle" ADD COLUMN "titleEn" TEXT;
ALTER TABLE "NewsArticle" ADD COLUMN "titleEs" TEXT;
ALTER TABLE "NewsArticle" ADD COLUMN "titleFr" TEXT;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN "descriptionEn" TEXT;
ALTER TABLE "Product" ADD COLUMN "descriptionEs" TEXT;
ALTER TABLE "Product" ADD COLUMN "descriptionFr" TEXT;
ALTER TABLE "Product" ADD COLUMN "nameEn" TEXT;
ALTER TABLE "Product" ADD COLUMN "nameEs" TEXT;
ALTER TABLE "Product" ADD COLUMN "nameFr" TEXT;

-- AlterTable
ALTER TABLE "VirtualCalendarEvent" ADD COLUMN "labelEn" TEXT;
ALTER TABLE "VirtualCalendarEvent" ADD COLUMN "labelEs" TEXT;
ALTER TABLE "VirtualCalendarEvent" ADD COLUMN "labelFr" TEXT;

-- AlterTable
ALTER TABLE "VirtualSession" ADD COLUMN "detailsEn" TEXT;
ALTER TABLE "VirtualSession" ADD COLUMN "detailsEs" TEXT;
ALTER TABLE "VirtualSession" ADD COLUMN "detailsFr" TEXT;
ALTER TABLE "VirtualSession" ADD COLUMN "titleEn" TEXT;
ALTER TABLE "VirtualSession" ADD COLUMN "titleEs" TEXT;
ALTER TABLE "VirtualSession" ADD COLUMN "titleFr" TEXT;
