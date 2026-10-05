import Link from "next/link";
import ResultsExplorer from "../../components/ResultsExplorer";
import { prisma } from "../../lib/db";

export const metadata = {
  title: "Resultados — Drift Factory",
  description: "Resultados por ronda dos campeonatos CPD, DMEC, CFD e DSS.",
};

export default async function ResultadosPage() {
  const rounds = await prisma.resultRound.findMany({ orderBy: { id: "asc" } });

  const groups = [];
  for (const r of rounds) {
    let group = groups.find((g) => g.code === r.champCode);
    if (!group) {
      group = { code: r.champCode, rounds: [] };
      groups.push(group);
    }
    group.rounds.push(r);
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Início</Link> / Resultados</div>
          <span className="eyebrow">Classificações</span>
          <h1 className="display h1">Resultados</h1>
          <p className="lede" style={{ marginTop: ".8rem" }}>
            Classificação geral, ronda a ronda, de cada campeonato.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {groups.length === 0 ? (
            <p className="lede">Ainda não há resultados publicados.</p>
          ) : (
            <ResultsExplorer groups={groups} />
          )}
        </div>
      </section>
    </>
  );
}
