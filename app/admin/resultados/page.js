import Link from "next/link";
import { requireAdmin } from "../../lib/authGuard";
import { prisma } from "../../lib/db";
import { deleteRound } from "./actions";

export const metadata = { title: "Resultados — Painel Drift Factory" };

function rowCount(rowsJson) {
  try {
    return JSON.parse(rowsJson || "[]").length;
  } catch {
    return 0;
  }
}

export default async function AdminResultadosPage() {
  await requireAdmin();
  const rounds = await prisma.resultRound.findMany({ orderBy: { id: "desc" } });

  return (
    <>
      <div className="admin-content-head">
        <div>
          <h1>Resultados</h1>
          <p>{rounds.length} tabela(s) registada(s).</p>
        </div>
      </div>

      <div className="admin-toolbar">
        <Link href="/admin/resultados/novo" className="btn btn-lime btn-sm">Nova tabela</Link>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Campeonato</th><th>Etiqueta</th><th className="num">Rondas</th><th className="num">Pilotos</th><th></th></tr>
          </thead>
          <tbody>
            {rounds.map((r) => (
              <tr key={r.id}>
                <td>{r.champCode}</td>
                <td>{r.eyebrow}</td>
                <td className="num">{r.rounds}</td>
                <td className="num">{rowCount(r.rowsJson)}</td>
                <td>
                  <div className="admin-table-actions">
                    <Link href={`/admin/resultados/${r.id}/editar`} className="admin-link-btn">Editar</Link>
                    <form action={deleteRound.bind(null, r.id)}>
                      <button type="submit" className="admin-link-btn danger">Apagar</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {rounds.length === 0 && <tr><td colSpan={5}>Ainda não há tabelas.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
