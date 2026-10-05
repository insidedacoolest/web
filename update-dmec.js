const { createClient } = require("@libsql/client");

// Freshly transcribed from https://dm.gp/seasons/drift-masters-2026/standings/ (2026-09-16).
// "-" (did not compete) converted to 0, consistent with how earlier rounds were stored.
const NEW = [
  ["Paweł KORPULIŃSKI", "Poland", [64, 55, 104, 55, 104, 32, 95]],
  ["Conor SHANAHAN", "Ireland", [107, 88, 24, 16, 39, 96, 104]],
  ["Piotr WIĘCEK", "Poland", [82, 104, 16, 56, 72, 106, 32]],
  ["James DEANE", "Ireland", [89, 72, 54, 51, 32, 39, 84]],
  ["Jack SHANAHAN", "Ireland", [35, 48, 39, 106, 16, 81, 32]],
  ["Duane MCKEEVER", "Ireland", [56, 35, 53, 17, 32, 51, 70]],
  ["Conor FALVEY", "Ireland", [16, 32, 88, 21, 82, 16, 32]],
  ["Oliver RANDALU", "Estonia", [16, 32, 16, 76, 48, 48, 49]],
  ["Kevin PESUR", "Estonia", [48, 16, 76, 32, 16, 48, 32]],
  ["Mika KESKI-KORPI", "Finland", [36, 82, 35, 20, 16, 32, 34]],
  ["Nikolass BERTANS", "Latvia", [48, 48, 48, 16, 16, 52, 16]],
  ["Benediktas CIRBA", "Lithuania", [32, 16, 32, 88, 48, 0, 16]],
  ["Kevin PISKOLTY", "Hungary", [16, 16, 16, 48, 90, 16, 16]],
  ["Juha RINTANEN", "Finland", [48, 37, 16, 64, 16, 16, 16]],
  ["Nasser ALHARBALI", "El Salvador", [16, 48, 64, 32, 32, 0, 16]],
  ["Jarkko JYLHÄ", "Finland", [16, 16, 16, 32, 35, 32, 51]],
  ["Jakub PRZYGOŃSKI", "Poland", [37, 17, 32, 32, 32, 16, 32]],
  ["Jason BANET", "France", [32, 16, 34, 32, 0, 64, 16]],
  ["Jakub KRÓL", "Poland", [16, 16, 16, 16, 16, 32, 48]],
  ["Dawid SPOSÓB", "Poland", [16, 32, 16, 16, 16, 32, 32]],
  ["Simen OLSEN", "Norway", [16, 18, 0, 32, 16, 16, 53]],
  ["Diogo CORREIA", "Portugal", [32, 16, 16, 18, 0, 33, 32]],
  ["Itay SADEH", "Israel", [0, 0, 48, 32, 33, 16, 16]],
  ["Alan HYNES", "Ireland", [0, 32, 16, 32, 16, 32, 16]],
  ["Lauri HEINONEN", "Finland", [34, 16, 33, 0, 53, 0, 0]],
  ["Marco ZAKOURIL", "Czech Republic", [32, 16, 16, 16, 16, 16, 0]],
  ["Teemu ASUNMAA", "Finland", [16, 0, 32, 16, 32, 16, 0]],
  ["Espen ROHDE", "Norway", [16, 32, 16, 0, 16, 18, 0]],
  ["David EGAN", "Ireland", [16, 16, 32, 0, 16, 0, 0]],
  ["Juha PÖYTÄLAAKSO", "Finland", [16, 16, 16, 0, 0, 16, 16]],
  ["Harry KERR", "Ireland", [16, 16, 16, 0, 0, 16, 0]],
  ["Clint VAN OORT", "Netherlands", [16, 16, 0, 16, 0, 16, 0]],
  ["Siim Oskar Hääl", "Estonia", [0, 0, 0, 0, 48, 0, 0]],
  ["Raman Kandratsenka", "Portugal", [0, 32, 0, 0, 16, 0, 0]],
  ["Yves MEYER", "Switzerland", [0, 16, 0, 0, 16, 0, 16]],
  ["Mikolaj Zakrzewski", "Poland", [0, 0, 0, 0, 0, 16, 16]],
  ["Łukasz TASIEMSKI", "Poland", [16, 0, 0, 0, 0, 0, 16]],
  ["Igor DERENKO", "Ukraine", [0, 0, 0, 0, 0, 16, 16]],
  ["George CHRISTOFOROU", "Cyprus", [16, 0, 0, 0, 0, 0, 16]],
  ["Dylan GARVEY", "Ireland", [0, 0, 16, 0, 0, 16, 0]],
  ["Ali MAKHSEED", "Kuwait", [0, 0, 0, 0, 0, 0, 16]],
  ["Kim Björklund", "Finland", [0, 0, 0, 16, 0, 0, 0]],
  ["Graig Meriloo", "Estonia", [0, 0, 0, 16, 0, 0, 0]],
  ["Paulus Perkkiö", "Finland", [0, 0, 0, 16, 0, 0, 0]],
  ["Mārtiņš IMMERMANIS", "Latvia", [0, 0, 0, 0, 16, 0, 0]],
  ["Lukasz Kaliszewski", "Poland", [0, 0, 0, 0, 0, 0, 16]],
  ["Kristiina AALTO", "Finland", [0, 0, 0, 16, 0, 0, 0]],
  ["Daniels BAUMANIS", "Latvia", [0, 0, 0, 0, 16, 0, 0]],
  ["Mads ANDREASEN", "Denmark", [0, 0, 0, 16, 0, 0, 0]],
  ["Karim HANY", "Egypt", [0, 0, 16, 0, 0, 0, 0]],
  ["Enver HASKASAP", "Türkiye", [0, 0, 0, 0, 0, 16, 0]],
  ["Manuel VACCA", "Italy", [0, 0, 0, 0, 0, 0, 0]],
  ["Anthony ROCCI", "France", [0, 0, 0, 0, 0, 0, 0]],
  ["Konstantyn SHCHURENKO", "Ukraine", [0, 0, 0, 0, 0, 0, 0]],
  ["Michele Landolfi", "Italy", [0, 0, 0, 0, 0, 0, 0]],
  ["Riccardo TONALI", "Italy", [0, 0, 0, 0, 0, 0, 0]],
  ["Ole Peter VATN", "Norway", [0, 0, 0, 0, 0, 0, 0]],
  ["Joao VIEIRA", "Portugal", [0, 0, 0, 0, 0, 0, 0]],
  ["Adrian Cabanillas", "Spain", [0, 0, 0, 0, 0, 0, 0]],
  ["Timur LYPSKYI", "Ukraine", [0, 0, 0, 0, 0, 0, 0]],
  ["Alex BUTLER", "Ireland", [0, 0, 0, 0, 0, 0, 0]],
  ["Dylan WILSON", "United Kingdom", [0, 0, 0, 0, 0, 0, 0]],
  ["Jakub KRZYSZCZAK", "Poland", [0, 0, 0, 0, 0, 0, 0]],
  ["Steven McConnell", "United Kingdom", [0, 0, 0, 0, 0, 0, 0]],
  ["Callum COOGAN", "Ireland", [0, 0, 0, 0, 0, 0, 0]],
  ["Ville KAUKONEN", "Finland", [0, 0, 0, 0, 0, 0, 0]],
  ["Matias LINDELL", "Finland", [0, 0, 0, 0, 0, 0, 0]],
  ["Andrius VASILIAUSKAS", "Lithuania", [0, 0, 0, 0, 0, 0, 0]],
  ["Alvis Ledskalnins", "Latvia", [0, 0, 0, 0, 0, 0, 0]],
  ["Toni OJATALO", "Finland", [0, 0, 0, 0, 0, 0, 0]],
  ["Axel Hildebrand", "Sweden", [0, 0, 0, 0, 0, 0, 0]],
  ["Jason Ye", "People's Republic of China", [0, 0, 0, 0, 0, 0, 0]],
  ["Dominik Kur", "Poland", [0, 0, 0, 0, 0, 0, 0]],
  ["Pauli Laakso", "Finland", [0, 0, 0, 0, 0, 0, 0]],
  ["Adrian PETRIČEVIĆ", "Croatia", [0, 0, 0, 0, 0, 0, 0]],
  ["Artur HAVRYLENKO", "Ukraine", [0, 0, 0, 0, 0, 0, 0]],
  ["Thanupat LERTTAWEEVIT", "Thailand", [0, 0, 0, 0, 0, 0, 0]],
  ["Kemal Soylu", "Türkiye", [0, 0, 0, 0, 0, 0, 0]],
  ["Peter Brolli", "Austria", [0, 0, 0, 0, 0, 0, 0]],
  ["Max HEIDRICH", "Germany", [0, 0, 0, 0, 0, 0, 0]],
  ["Lukas Souhrada", "Czech Republic", [0, 0, 0, 0, 0, 0, 0]],
  ["Stavros Gryllis", "Greece", [0, 0, 0, 0, 0, 0, 0]],
];

function total(points) {
  return points.reduce((a, b) => a + b, 0);
}

async function main() {
  const client = createClient({ url: process.env.DATABASE_URL || "file:./dev.db" });
  const r = await client.execute("SELECT id, rowsJson FROM ResultRound WHERE champCode='DMEC'");
  const existingRows = JSON.parse(r.rows[0].rowsJson);
  const carByName = new Map(existingRows.map((row) => [row.name, row.car]));

  const totalsBefore = existingRows.reduce((sum, row) => sum + total(row.points), 0);
  const rows = NEW.map(([name, country, points]) => ({
    name,
    country,
    car: carByName.get(name) || "",
    points,
  }));
  const totalsAfter = rows.reduce((sum, row) => sum + total(row.points), 0);

  const missingCar = rows.filter((r) => !r.car).map((r) => r.name);
  console.log("Existing rows:", existingRows.length, "-> New rows:", rows.length);
  console.log("Sum of all points before:", totalsBefore, "after:", totalsAfter);
  console.log("New drivers with no car on file:", missingCar);

  await client.execute({
    sql: 'UPDATE "ResultRound" SET "rowsJson" = ?, "rounds" = 7, "updatedAt" = ? WHERE "champCode" = \'DMEC\'',
    args: [JSON.stringify(rows), new Date().toISOString()],
  });
  console.log("DMEC atualizado: rounds=7,", rows.length, "pilotos.");
}

main();
