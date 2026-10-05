import "dotenv/config";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@libsql/client";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CSV_PATH = path.join(ROOT, "driver-cfd-overlaps.csv");
const client = createClient({ url: process.env.DATABASE_URL ?? `file:${path.join(ROOT, "dev.db")}` });

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/);
  const header = lines[0].split(",");
  return lines.slice(1).map((line) => {
    const vals = [];
    let field = "", inQ = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (inQ) {
        if (c === '"') { inQ = false; } else field += c;
      } else {
        if (c === '"') inQ = true;
        else if (c === ",") { vals.push(field); field = ""; }
        else field += c;
      }
    }
    vals.push(field);
    return Object.fromEntries(header.map((h, i) => [h, vals[i] ?? ""]));
  });
}

const rows = parseCsv(readFileSync(CSV_PATH, "utf8"));
let updated = 0;
for (const r of rows) {
  const res = await client.execute({
    sql: `UPDATE Driver SET catsCsv = ?, champsCsv = ?, updatedAt = ? WHERE slug = ?`,
    args: [r.newCatsCsv, r.newChampsCsv, new Date().toISOString(), r.slug],
  });
  console.log(r.slug, "->", r.newCatsCsv, "/", r.newChampsCsv, "(rows affected:", res.rowsAffected, ")");
  if (res.rowsAffected > 0) updated++;
}
console.log(`\nUpdated ${updated}/${rows.length} overlap drivers.`);
client.close();
