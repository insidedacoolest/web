import Link from "next/link";
import { prisma } from "../../lib/db";

export const metadata = {
  title: "Campeonatos — Drift Factory",
  description: "CPD, DMEC, CFD, DSS e outras séries de drift que acompanhamos em Portugal e na Europa.",
};

function posClass(pos) {
  if (pos === 1) return "pos p1";
  if (pos === 2) return "pos p2";
  if (pos === 3) return "pos p3";
  return "pos";
}

export default async function CampeonatosPage() {
  const [champs, standings, driverCount] = await Promise.all([
    prisma.championship.findMany({ orderBy: { id: "asc" } }),
    prisma.standingEntry.findMany({ where: { champCode: "CPD" }, orderBy: { pos: "asc" } }),
    prisma.driver.count(),
  ]);

  const totalRounds = champs.reduce((sum, c) => sum + c.rounds, 0);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Início</Link> / Campeonatos</div>
          <span className="eyebrow pink">Séries</span>
          <h1 className="display h1">Campeonatos</h1>
          <p className="lede" style={{ marginTop: ".8rem" }}>
            As competições que seguimos ronda a ronda — nacionais e europeias.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {champs.length === 0 ? (
            <p className="lede">Ainda não há campeonatos registados.</p>
          ) : (
            <div className="grid grid-2">
              {champs.map((c) => (
                <div className="champ-card" data-code={c.code} key={c.code}>
                  <span className="champ-code">{c.code}</span>
                  <span className="champ-name">{c.name}</span>
                  <p className="champ-desc">{c.desc}</p>
                  <div className="champ-foot"><span>{c.rounds} rondas · 2026</span><span>{c.scope}</span></div>
                  <Link href="/resultados" className="btn btn-outline btn-sm" style={{ alignSelf: "flex-start" }}>Ver resultados</Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {standings.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow">CPD 2026</span>
                <h2 className="display h2">Classificação</h2>
              </div>
            </div>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr><th>Pos</th><th>Piloto</th><th>Equipa</th><th>Carro</th><th className="num">Pontos</th></tr>
                </thead>
                <tbody>
                  {standings.map((s) => (
                    <tr key={s.id}>
                      <td className={posClass(s.pos)}>{s.pos}</td>
                      <td>{s.name}</td>
                      <td>{s.team}</td>
                      <td>{s.car}</td>
                      <td className="num">{s.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <div className="stat-strip">
            <div className="hero-stat"><b>{totalRounds}</b><span>Rondas na época 2026</span></div>
            <div className="hero-stat"><b>{champs.length}</b><span>Séries acompanhadas</span></div>
            <div className="hero-stat"><b>{driverCount}</b><span>Pilotos na base de dados</span></div>
          </div>
        </div>
      </section>
    </>
  );
}
