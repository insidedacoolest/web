// One-off import script for the 78 Drift Masters Grand Prix 2026 drivers.
//
// NOTE ON PRISMA: the generated Prisma client under app/generated/prisma is
// emitted as raw TypeScript (Prisma 7's "prisma-client" generator) and has
// been unreliable to import from a plain standalone .mjs script outside of
// Next.js/prisma's own tooling. This script therefore talks to the SQLite
// database directly via @libsql/client with parameterized raw SQL, the same
// driver used by the app's Prisma adapter (see prisma/seed.mjs), instead of
// going through PrismaClient.
//
// This script is NOT run automatically. To use it:
//   node scripts/import-drivers.mjs
//
// It reads driver-import-data.csv (produced during the DMGP 2026 import
// research pass) from the project root and INSERTs one Driver row per line.
// Existing drivers with the same slug are left untouched by default (see
// SKIP_EXISTING below) so it's safe to re-run.
//
// Photo credit: driver photographs sourced from Drift Masters (dm.gp),
// used with permission granted by Drift Masters (office@driftmasters.gp).
// Credit: Drift Masters / dm.gp.

import "dotenv/config";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@libsql/client";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CSV_PATH = path.join(ROOT, "driver-import-data.csv");

const SKIP_EXISTING = true; // set to false to overwrite rows with a matching slug

const client = createClient({ url: process.env.DATABASE_URL ?? `file:${path.join(ROOT, "dev.db")}` });

// --- minimal RFC4180 CSV parser (handles quoted fields, embedded commas/newlines/quotes) ---
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  let i = 0;
  const len = text.length;
  while (i < len) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i++;
        continue;
      }
      field += c;
      i++;
      continue;
    }
    if (c === '"') {
      inQuotes = true;
      i++;
      continue;
    }
    if (c === ",") {
      row.push(field);
      field = "";
      i++;
      continue;
    }
    if (c === "\r") {
      i++;
      continue;
    }
    if (c === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
      i++;
      continue;
    }
    field += c;
    i++;
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.length > 1 || (r.length === 1 && r[0] !== ""));
}

function toRecords(rows) {
  const [header, ...body] = rows;
  return body.map((r) => Object.fromEntries(header.map((h, idx) => [h, r[idx] ?? ""])));
}

async function main() {
  const csvText = readFileSync(CSV_PATH, "utf8");
  const records = toRecords(parseCsv(csvText));
  console.log(`Read ${records.length} drivers from ${CSV_PATH}`);

  let inserted = 0;
  let skipped = 0;

  for (const r of records) {
    if (SKIP_EXISTING) {
      const existing = await client.execute({
        sql: `SELECT id FROM Driver WHERE slug = ?`,
        args: [r.slug],
      });
      if (existing.rows.length > 0) {
        skipped++;
        continue;
      }
    }

    const now = new Date().toISOString();
    await client.execute({
      sql: `INSERT INTO Driver
        (slug, num, firstName, lastName, team, car, power, nationality, flag,
         birthDate, born, catsCsv, champsCsv, standing, points, bestStanding,
         wins, podiums, bio, instagram, historyJson, imageUrl, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        r.slug,
        r.num,
        r.firstName,
        r.lastName,
        r.team,
        r.car,
        Number(r.power) || 0,
        r.nationality,
        r.flag,
        r.birthDate,
        r.born,
        r.catsCsv,
        r.champsCsv,
        Number(r.standing) || 0,
        Number(r.points) || 0,
        Number(r.bestStanding) || 0,
        Number(r.wins) || 0,
        Number(r.podiums) || 0,
        r.bio,
        r.instagram,
        r.historyJson,
        r.imageUrl || null,
        now,
        now,
      ],
    });
    inserted++;
  }

  console.log(`Inserted ${inserted} drivers, skipped ${skipped} (already present).`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    client.close();
  });
