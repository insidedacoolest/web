import Link from "next/link";
import { requireAdmin } from "../../lib/authGuard";
import { prisma } from "../../lib/db";
import { deleteEntry } from "./actions";

export const metadata = { title: "Drift Virtual — Painel Drift Factory" };

export default async function AdminDriftVirtualPage() {
  await requireAdmin();
  const entries = await prisma.leaderboardEntry.findMany({ orderBy: { pos: "asc" } });

  return (
    <>
      <div className="admin-content-head">
        <div>
          <h1>Drift Virtual</h1>
          <p>{entries.length} entrada(s) no leaderboard.</p>
        </div>
      </div>

      <div className="admin-toolbar">
        <Link href="/admin/drift-virtual/novo" className="btn btn-lime btn-sm">Nova entrada no leaderboard</Link>
        <Link href="/admin/drift-virtual/sessao" className="btn btn-outline btn-sm">Editar próxima sessão</Link>
        <Link href="/admin/drift-virtual/calendario" className="btn btn-outline btn-sm">Gerir calendário</Link>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Pos</th><th>Jogador</th><th>Plataforma</th><th className="num">Pontuação</th><th></th></tr>
          </thead>
          <tbody>
            {entries.map((e) => (
              <tr key={e.id}>
                <td>{e.pos}</td>
                <td>{e.name}</td>
                <td>{e.platform}</td>
                <td className="num">{e.score}</td>
                <td>
                  <div className="admin-table-actions">
                    <Link href={`/admin/drift-virtual/${e.id}/editar`} className="admin-link-btn">Editar</Link>
                    <form action={deleteEntry.bind(null, e.id)}>
                      <button type="submit" className="admin-link-btn danger">Apagar</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {entries.length === 0 && <tr><td colSpan={5}>Ainda não há entradas.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
