import Link from "next/link";
import { requireAdmin } from "../../lib/authGuard";
import { prisma } from "../../lib/db";
import { deleteChampionship, deleteStanding } from "./actions";

export const metadata = { title: "Campeonatos — Painel Drift Factory" };

export default async function AdminCampeonatosPage() {
  await requireAdmin();
  const [champs, standings] = await Promise.all([
    prisma.championship.findMany({ orderBy: { id: "asc" } }),
    prisma.standingEntry.findMany({ orderBy: [{ champCode: "asc" }, { pos: "asc" }] }),
  ]);

  return (
    <>
      <div className="admin-content-head">
        <div>
          <h1>Campeonatos</h1>
          <p>{champs.length} série(s) registadas.</p>
        </div>
      </div>

      <div className="admin-toolbar">
        <Link href="/admin/campeonatos/novo" className="btn btn-lime btn-sm">Novo campeonato</Link>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Código</th><th>Nome</th><th>Âmbito</th><th className="num">Rondas</th><th></th></tr>
          </thead>
          <tbody>
            {champs.map((c) => (
              <tr key={c.id}>
                <td>{c.code}</td>
                <td>{c.name}</td>
                <td>{c.scope}</td>
                <td className="num">{c.rounds}</td>
                <td>
                  <div className="admin-table-actions">
                    <Link href={`/admin/campeonatos/${c.id}/editar`} className="admin-link-btn">Editar</Link>
                    <form action={deleteChampionship.bind(null, c.id)}>
                      <button type="submit" className="admin-link-btn danger">Apagar</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {champs.length === 0 && <tr><td colSpan={5}>Ainda não há campeonatos.</td></tr>}
          </tbody>
        </table>
      </div>

      <div className="admin-subsection">
        <div className="admin-content-head">
          <div>
            <h1 style={{ fontSize: "1.5rem" }}>Classificação</h1>
            <p>Tabela de classificação por campeonato (usada na página Campeonatos).</p>
          </div>
        </div>

        <div className="admin-toolbar">
          <Link href="/admin/campeonatos/classificacao/novo" className="btn btn-lime btn-sm">Nova entrada</Link>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Campeonato</th><th className="num">Pos</th><th>Piloto</th><th>Equipa</th><th>Carro</th><th className="num">Pontos</th><th></th></tr>
            </thead>
            <tbody>
              {standings.map((s) => (
                <tr key={s.id}>
                  <td>{s.champCode}</td>
                  <td className="num">{s.pos}</td>
                  <td>{s.name}</td>
                  <td>{s.team}</td>
                  <td>{s.car}</td>
                  <td className="num">{s.points}</td>
                  <td>
                    <div className="admin-table-actions">
                      <Link href={`/admin/campeonatos/classificacao/${s.id}/editar`} className="admin-link-btn">Editar</Link>
                      <form action={deleteStanding.bind(null, s.id)}>
                        <button type="submit" className="admin-link-btn danger">Apagar</button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              {standings.length === 0 && <tr><td colSpan={7}>Ainda não há entradas.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
