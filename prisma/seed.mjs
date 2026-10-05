import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../app/generated/prisma/client.ts";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({ url: process.env.DATABASE_URL ?? "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

const DRIVERS = [
  { slug: "ruben-teixeira", num: "07", firstName: "Rúben", lastName: "Teixeira", team: "Team Asfalto", car: "BMW E46", power: 750, nationality: "Portugal", flag: "🇵🇹", birthDate: "12 mar 1998", born: "Braga, Portugal", cats: ["cpd", "pro"], champs: ["CPD"], standing: 1, points: 312, bestStanding: 1, wins: 3, podiums: 6, bio: "Um dos nomes mais consistentes da grelha nacional. Rúben chegou ao CPD em 2022 vindo do karting e rapidamente se tornou candidato ao título, com um estilo agressivo na entrada e muita confiança em pista molhada.", instagram: "https://www.instagram.com/_driftfactory", history: [{ season: 2026, standing: 1, points: 312 }, { season: 2025, standing: 3, points: 245 }, { season: 2024, standing: 7, points: 140 }] },
  { slug: "mariana-costa", num: "22", firstName: "Mariana", lastName: "Costa", team: "Nitro Garage", car: "Nissan S15", power: 680, nationality: "Portugal", flag: "🇵🇹", birthDate: "4 set 1999", born: "Porto, Portugal", cats: ["dmec", "pro"], champs: ["DMEC"], standing: 6, points: 219, bestStanding: 4, wins: 1, podiums: 4, bio: "A representante portuguesa na grelha europeia. Mariana estreou-se no DMEC em 2024 e já soma um pódio internacional, com o S15 preparado pela Nitro Garage.", instagram: "https://www.instagram.com/_driftfactory", history: [{ season: 2026, standing: 6, points: 219 }, { season: 2025, standing: 4, points: 260 }, { season: 2024, standing: 9, points: 110 }] },
  { slug: "diogo-ferreira", num: "44", firstName: "Diogo", lastName: "Ferreira", team: "Fumo Racing", car: "Toyota Chaser", power: 620, nationality: "Portugal", flag: "🇵🇹", birthDate: "27 jan 2001", born: "Faro, Portugal", cats: ["cfd", "rookie"], champs: ["CFD"], standing: 2, points: 298, bestStanding: 2, wins: 2, podiums: 5, bio: "Revelação da época passada, Diogo saltou da categoria de acesso diretamente para a luta pelo pódio no CFD com o seu Toyota Chaser turbo.", instagram: "https://www.instagram.com/_driftfactory", history: [{ season: 2026, standing: 2, points: 298 }, { season: 2025, standing: 11, points: 88 }] },
  { slug: "sara-alves", num: "13", firstName: "Sara", lastName: "Alves", team: "Vortex Motorsport", car: "BMW E36", power: 700, nationality: "Portugal", flag: "🇵🇹", birthDate: "19 jun 1997", born: "Coimbra, Portugal", cats: ["dss", "pro"], champs: ["DSS"], standing: 3, points: 276, bestStanding: 1, wins: 4, podiums: 8, bio: "Campeã DSS em 2025, Sara é conhecida pela linha agressiva e pelos ângulos extremos no seu BMW E36. Uma das pilotas mais premiadas da grelha nacional.", instagram: "https://www.instagram.com/_driftfactory", history: [{ season: 2026, standing: 3, points: 276 }, { season: 2025, standing: 1, points: 340 }, { season: 2024, standing: 2, points: 298 }] },
  { slug: "miguel-santos", num: "18", firstName: "Miguel", lastName: "Santos", team: "North Drift Crew", car: "Nissan 200SX", power: 640, nationality: "Portugal", flag: "🇵🇹", birthDate: "2 nov 2000", born: "Vila Real, Portugal", cats: ["cpd", "pro"], champs: ["CPD"], standing: 4, points: 254, bestStanding: 4, wins: 1, podiums: 3, bio: "Piloto do norte do país, Miguel construiu o seu 200SX em casa antes de se juntar à North Drift Crew. Especialista em traçados técnicos e de baixa velocidade.", instagram: "https://www.instagram.com/_driftfactory", history: [{ season: 2026, standing: 4, points: 254 }, { season: 2025, standing: 8, points: 165 }] },
  { slug: "tiago-neves", num: "91", firstName: "Tiago", lastName: "Neves", team: "Overtake Garage", car: "Lexus SC300", power: 590, nationality: "Portugal", flag: "🇵🇹", birthDate: "15 mai 2003", born: "Aveiro, Portugal", cats: ["cpd", "rookie"], champs: ["CPD"], standing: 5, points: 231, bestStanding: 5, wins: 0, podiums: 2, bio: "Na sua primeira época completa no CPD, Tiago já surpreendeu com dois pódios na categoria Rookie a bordo do seu Lexus SC300.", instagram: "https://www.instagram.com/_driftfactory", history: [{ season: 2026, standing: 5, points: 231 }] },
  { slug: "andre-lopes", num: "05", firstName: "André", lastName: "Lopes", team: "Redline PT", car: "BMW E36", power: 710, nationality: "Portugal", flag: "🇵🇹", birthDate: "8 fev 1995", born: "Lisboa, Portugal", cats: ["dmec", "pro"], champs: ["DMEC"], standing: 7, points: 198, bestStanding: 3, wins: 2, podiums: 7, bio: "Um veterano da grelha europeia, André representa Portugal no DMEC desde 2023 e é uma referência para a nova geração de pilotos nacionais.", instagram: "https://www.instagram.com/_driftfactory", history: [{ season: 2026, standing: 7, points: 198 }, { season: 2025, standing: 3, points: 255 }, { season: 2024, standing: 5, points: 210 }] },
  { slug: "carlos-pinto", num: "77", firstName: "Carlos", lastName: "Pinto", team: "Team Asfalto", car: "Nissan Silvia", power: 600, nationality: "Portugal", flag: "🇵🇹", birthDate: "30 ago 2002", born: "Setúbal, Portugal", cats: ["dss", "rookie"], champs: ["DSS"], standing: 8, points: 176, bestStanding: 8, wins: 0, podiums: 1, bio: "Colega de equipa de Rúben Teixeira na Team Asfalto, Carlos estreou-se este ano no DSS depois de várias épocas em competições de time attack.", instagram: "https://www.instagram.com/_driftfactory", history: [{ season: 2026, standing: 8, points: 176 }] },
];

const NEWS = [
  { title: "Ronda 4 do CPD marcada para Braga com grelha reforçada", excerpt: "A organização confirmou uma lista de pilotos convidados que promete elevar o nível da qualificação este fim de semana.", badge: "CPD", badgePink: false, grad: 1, cats: ["cpd"], dateLabel: "3 ago 2026", publishedAt: "2026-08-03", icon: "target" },
  { title: "Lista de wildcards revelada para a próxima ronda europeia", excerpt: "Entre os nomes anunciados estão dois pilotos portugueses à procura do primeiro pódio internacional.", badge: "DMEC", badgePink: true, grad: 2, cats: ["dmec", "internacional"], dateLabel: "1 ago 2026", publishedAt: "2026-08-01", icon: "wildcards" },
  { title: "Guia rápido: ângulo de câmber para pneus semi-slick", excerpt: "Três mecânicos da grelha nacional partilham as configurações que usam antes de cada ronda de qualificação.", badge: "Técnica", badgePink: false, grad: 3, cats: ["tecnica"], dateLabel: "29 jul 2026", publishedAt: "2026-07-29", icon: "gear" },
  { title: "CFD confirma novo traçado para a ronda de outono", excerpt: "O novo layout promete zonas de entrada mais rápidas e uma clipping zone dupla para o setor final.", badge: "CFD", badgePink: false, grad: 4, cats: ["cfd"], dateLabel: "27 jul 2026", publishedAt: "2026-07-27", icon: "flag" },
  { title: "DSS abre inscrições para a categoria Rookie 2026", excerpt: "Novos pilotos podem já garantir lugar na grelha de acesso, com provas de qualificação em setembro.", badge: "DSS", badgePink: false, grad: 1, cats: ["dss"], dateLabel: "24 jul 2026", publishedAt: "2026-07-24", icon: "wave" },
  { title: "Formula Drift anuncia calendário revisto para a segunda metade da época", excerpt: "A organização norte-americana ajustou duas datas depois de conflitos de calendário com outras séries.", badge: "Internacional", badgePink: true, grad: 2, cats: ["internacional"], dateLabel: "22 jul 2026", publishedAt: "2026-07-22", icon: "globe" },
  { title: "Entrevista: o que muda no regulamento técnico de 2026", excerpt: "Falámos com a comissão técnica do CPD sobre os novos limites de potência e as alterações à grelha júnior.", badge: "CPD", badgePink: false, grad: 3, cats: ["cpd"], dateLabel: "19 jul 2026", publishedAt: "2026-07-19", icon: "triangle" },
  { title: "Como ler uma tabela de pontuação de batalhas top 32", excerpt: "Um guia simples para perceberes os critérios de linha, ângulo e estilo usados pelos juízes.", badge: "Técnica", badgePink: false, grad: 4, cats: ["tecnica"], dateLabel: "15 jul 2026", publishedAt: "2026-07-15", icon: "dart" },
  { title: "Classificação atualizada após a ronda de verão", excerpt: "A luta pelo título europeu aperta-se com apenas 14 pontos a separar os três primeiros classificados.", badge: "DMEC", badgePink: true, grad: 1, cats: ["dmec"], dateLabel: "12 jul 2026", publishedAt: "2026-07-12", icon: "bars" },
];

const PRODUCTS = [
  { name: "T-shirt Drift Factory — Preta", description: "A t-shirt de sempre da Drift Factory. Algodão pesado, corte reto, estampado resistente — para usares nas bancadas ou no dia a dia.", sizes: "S,M,L,XL,2XL", price: 24.9, cats: ["vestuario"], icon: "shirt", color: "lime", grad: 1 },
  { name: "Hoodie Tire Smoke", description: "Hoodie quente e confortável com estampado inspirado no fumo dos pneus. Interior turco, ideal para os dias mais frios de paddock.", sizes: "S,M,L,XL,2XL", price: 44.9, cats: ["vestuario"], icon: "shirt", color: "pink", grad: 2 },
  { name: "Boné Drift Factory", description: "Boné ajustável com o logótipo Drift Factory bordado à frente. Aba curva, tamanho único.", sizes: null, price: 18.5, cats: ["acessorios"], icon: "cap", color: "lime", grad: 3 },
  { name: "Pack de Autocolantes (x10)", description: "10 autocolantes variados da Drift Factory — para o carro, o portátil ou a mala. Vinil resistente à água.", sizes: null, price: 7.9, cats: ["acessorios"], icon: "stickers", color: "pink", grad: 4 },
  { name: "T-shirt Circuito — Branca", description: "Edição limitada com o traçado de um dos circuitos do CPD estampado nas costas. Algodão 100%, corte unissexo.", sizes: "S,M,L,XL,2XL", price: 21.9, oldPrice: 27.9, cats: ["vestuario"], icon: "shirt", color: "lime", grad: 1 },
  { name: "Miniatura 1:64 — Edição CPD", description: "Réplica em escala 1:64 de um dos carros do grid nacional, edição especial CPD. Peça de coleção, vem em caixa.", sizes: null, price: 14.9, cats: ["colecionaveis"], icon: "miniature", color: "pink", grad: 2 },
  { name: "Caderno Pit Notes", description: "Caderno de bolso para anotares setups, tempos e notas de pista. Capa dura, 80 páginas pautadas.", sizes: null, price: 9.9, cats: ["acessorios"], icon: "notebook", color: "lime", grad: 3 },
  { name: "Patch Bordado Drift Factory", description: "Patch bordado para coseres ou colares (termocolante) em jaquetas, macacões ou mochilas.", sizes: null, price: 5.9, cats: ["colecionaveis"], icon: "patch", color: "pink", grad: 4 },
];

const CHAMPIONSHIPS = [
  { code: "CPD", name: "Campeonato Português de Drift", desc: "A competição nacional de referência, percorrendo os principais autódromos e kartings de Portugal. Reúne pilotos Pro e Rookie em 6 rondas por época.", rounds: 6, scope: "Nacional" },
  { code: "DMEC", name: "Drift Masters European Championship", desc: "A grande série europeia de drift, com grelhas internacionais, wildcards e batalhas top 32 em alguns dos melhores traçados do continente.", rounds: 7, scope: "Europeu" },
  { code: "CFD", name: "Circuito Fusão Drift", desc: "Uma das séries que acompanhamos de perto — qualificação cronometrada, tabela top 32 e finais decididas em batalhas a par.", rounds: 5, scope: "Regional" },
  { code: "DSS", name: "Drift Spirit Series", desc: "Sprint, batalhas a par e muita fumarada. Uma das rondas mais dinâmicas do calendário, com forte aposta em novos talentos.", rounds: 4, scope: "Regional" },
];

const STANDINGS = [
  { pos: 1, name: "Rúben Teixeira", team: "Team Asfalto", car: "BMW E46", points: 312 },
  { pos: 2, name: "Diogo Ferreira", team: "Fumo Racing", car: "Toyota Chaser", points: 298 },
  { pos: 3, name: "Sara Alves", team: "Vortex Motorsport", car: "BMW E36", points: 276 },
  { pos: 4, name: "Miguel Santos", team: "North Drift Crew", car: "Nissan 200SX", points: 254 },
  { pos: 5, name: "Tiago Neves", team: "Overtake Garage", car: "Lexus SC300", points: 231 },
  { pos: 6, name: "Mariana Costa", team: "Nitro Garage", car: "Nissan S15", points: 219 },
  { pos: 7, name: "André Lopes", team: "Redline PT", car: "BMW E36", points: 198 },
  { pos: 8, name: "Carlos Pinto", team: "Team Asfalto", car: "Nissan Silvia", points: 176 },
].map((s) => ({ ...s, champCode: "CPD" }));

const ROUNDS = [
  { champCode: "CPD", eyebrow: "CPD · Ronda 3", eyebrowPink: false, place: "Kartódromo de Vila Real", date: "20 julho 2026", col3Label: "Equipa", rows: [[1, "Rúben Teixeira", "Team Asfalto", "BMW E46", 58], [2, "Sara Alves", "Vortex Motorsport", "BMW E36", 52], [3, "Diogo Ferreira", "Fumo Racing", "Toyota Chaser", 47], [4, "Miguel Santos", "North Drift Crew", "Nissan 200SX", 41]] },
  { champCode: "DMEC", eyebrow: "DMEC · Ronda 4", eyebrowPink: true, place: "Hungaroring, Hungria", date: "6 julho 2026", col3Label: "País", rows: [[1, "Lukas Varga", "HU", "BMW E92", 65], [2, "Mariana Costa", "PT", "Nissan S15", 59], [3, "Jonas Weber", "DE", "Ford Mustang", 54], [4, "André Lopes", "PT", "BMW E36", 48]] },
  { champCode: "CFD", eyebrow: "CFD · Ronda 2", eyebrowPink: false, place: "Autódromo Internacional do Algarve", date: "14 junho 2026", col3Label: "Equipa", rows: [[1, "Diogo Ferreira", "Fumo Racing", "Toyota Chaser", 55], [2, "Carlos Pinto", "Team Asfalto", "Nissan Silvia", 50], [3, "Tiago Neves", "Overtake Garage", "Lexus SC300", 46]] },
  { champCode: "DSS", eyebrow: "DSS · Ronda 1", eyebrowPink: false, place: "Kartódromo de Palmela", date: "3 maio 2026", col3Label: "Equipa", rows: [[1, "Sara Alves", "Vortex Motorsport", "BMW E36", 50], [2, "Rúben Teixeira", "Team Asfalto", "BMW E46", 45], [3, "Miguel Santos", "North Drift Crew", "Nissan 200SX", 41]] },
];

const CALENDAR = [
  { month: "MAI", day: "03", fullDate: "2026-05-03T09:00:00", title: "DSS Ronda 1 — Kartódromo de Palmela", desc: "Sprint + batalhas a par · categoria Rookie e Pro", status: "done" },
  { month: "JUN", day: "14", fullDate: "2026-06-14T09:00:00", title: "CFD Ronda 2 — Autódromo do Algarve", desc: "Qualificação cronometrada + top 32", status: "done" },
  { month: "JUL", day: "06", fullDate: "2026-07-06T09:00:00", title: "DMEC Ronda 4 — Hungaroring, Hungria", desc: "Ronda europeia com grelha internacional", status: "done" },
  { month: "JUL", day: "20", fullDate: "2026-07-20T09:00:00", title: "CPD Ronda 3 — Kartódromo de Vila Real", desc: "Qualificação sábado, finais domingo", status: "done" },
  { month: "AGO", day: "16", fullDate: "2026-08-16T09:00:00", title: "CPD Ronda 4 — Kartódromo de Braga", desc: "Grelha reforçada com pilotos convidados", status: "live" },
  { month: "SET", day: "07", fullDate: "2026-09-07T09:00:00", title: "DSS Ronda 2 — Circuito do Estoril", desc: "Inscrições abertas para a categoria Rookie", status: "scheduled" },
  { month: "SET", day: "21", fullDate: "2026-09-21T09:00:00", title: "CFD Ronda 3 — Traçado de outono", desc: "Novo layout com clipping zone dupla", status: "scheduled" },
  { month: "OUT", day: "11", fullDate: "2026-10-11T09:00:00", title: "DMEC Ronda 5 — Circuito a anunciar", desc: "Penúltima ronda da luta pelo título europeu", status: "scheduled" },
  { month: "NOV", day: "08", fullDate: "2026-11-08T09:00:00", title: "CPD Final da Época — Local a anunciar", desc: "Decisão do título nacional 2026", status: "scheduled" },
];

const LEADERBOARD = [
  { pos: 1, name: "RTeixeira_07", platform: "Assetto Corsa", score: "98.4" },
  { pos: 2, name: "nitro.mariana", platform: "Assetto Corsa", score: "97.1" },
  { pos: 3, name: "chaser_diogo", platform: "CarX Drift Racing", score: "95.8" },
  { pos: 4, name: "saraalves.gg", platform: "Assetto Corsa", score: "94.6" },
  { pos: 5, name: "redline_andre", platform: "CarX Drift Racing", score: "93.2" },
];

async function main() {
  console.log("A limpar dados existentes...");
  await prisma.resultRow.deleteMany();
  await prisma.resultRound.deleteMany();
  await prisma.standingEntry.deleteMany();
  await prisma.championship.deleteMany();
  await prisma.calendarEvent.deleteMany();
  await prisma.leaderboardEntry.deleteMany();
  await prisma.product.deleteMany();
  await prisma.newsArticle.deleteMany();
  await prisma.driver.deleteMany();
  await prisma.adminUser.deleteMany();

  console.log("A criar utilizador admin...");
  const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD ?? "drift2026", 10);
  await prisma.adminUser.create({
    data: { email: process.env.ADMIN_EMAIL ?? "admin@driftfactory.pt", passwordHash },
  });

  console.log("A criar pilotos...");
  for (const d of DRIVERS) {
    await prisma.driver.create({
      data: {
        slug: d.slug, num: d.num, firstName: d.firstName, lastName: d.lastName,
        team: d.team, car: d.car, power: d.power, nationality: d.nationality, flag: d.flag,
        birthDate: d.birthDate, born: d.born, catsCsv: d.cats.join(","), champsCsv: d.champs.join(","),
        standing: d.standing, points: d.points, bestStanding: d.bestStanding, wins: d.wins, podiums: d.podiums,
        bio: d.bio, instagram: d.instagram, historyJson: JSON.stringify(d.history),
      },
    });
  }

  console.log("A criar notícias...");
  for (const n of NEWS) {
    await prisma.newsArticle.create({
      data: {
        title: n.title, excerpt: n.excerpt, badge: n.badge, badgePink: n.badgePink, icon: n.icon,
        grad: n.grad, catsCsv: n.cats.join(","), dateLabel: n.dateLabel, publishedAt: new Date(n.publishedAt),
      },
    });
  }

  console.log("A criar produtos...");
  for (const p of PRODUCTS) {
    await prisma.product.create({
      data: {
        name: p.name, description: p.description ?? "", price: p.price, oldPrice: p.oldPrice ?? null,
        catsCsv: p.cats.join(","), sizesCsv: p.sizes ?? null, icon: p.icon, color: p.color, grad: p.grad,
      },
    });
  }

  console.log("A criar campeonatos...");
  for (const c of CHAMPIONSHIPS) {
    await prisma.championship.create({ data: c });
  }

  console.log("A criar classificação CPD...");
  for (const s of STANDINGS) {
    await prisma.standingEntry.create({ data: s });
  }

  console.log("A criar rondas de resultados...");
  for (const r of ROUNDS) {
    await prisma.resultRound.create({
      data: {
        champCode: r.champCode, eyebrow: r.eyebrow, eyebrowPink: r.eyebrowPink,
        place: r.place, date: r.date, col3Label: r.col3Label,
        rows: {
          create: r.rows.map(([pos, name, teamOrCountry, car, points]) => ({
            pos, name, teamOrCountry, car, points,
          })),
        },
      },
    });
  }

  console.log("A criar eventos de calendário...");
  for (const e of CALENDAR) {
    await prisma.calendarEvent.create({
      data: { month: e.month, day: e.day, fullDate: new Date(e.fullDate), title: e.title, desc: e.desc, status: e.status },
    });
  }

  console.log("A criar leaderboard virtual...");
  for (const l of LEADERBOARD) {
    await prisma.leaderboardEntry.create({ data: l });
  }

  console.log("Seed concluído.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
