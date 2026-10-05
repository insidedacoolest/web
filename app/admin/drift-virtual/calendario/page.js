import Link from "next/link";
import { requireAdmin } from "../../../lib/authGuard";
import { prisma } from "../../../lib/db";
import { deleteCalendarEntry } from "./actions";

export const metadata = { title: "Calendário Drift Virtual — Painel Drift Factory" };

const STYLE_LABEL = { fill: "Preenchido", outline: "Contorno" };

export default async function AdminDriftVirtualCalendarioPage() {
  await requireAdmin();
  const entries = await prisma.virtualCalendarEvent.findMany({ orderBy: { date: "asc" } });

  return (
    <>
      <div className="admin-content-head">
        <div>
          <h1>Calendário Drift Virtual</h1>
          <p><Link href="/admin/drift-virtual">← Voltar ao Drift Virtual</Link></p>
        </div>
      </div>

      <div className="admin-toolbar">
        <Link href="/admin/drift-virtual/calendario/novo" className="btn btn-lime btn-sm">Nova sessão</Link>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Data</th><th>Etiqueta</th><th>Local</th><th>Estilo</th><th></th></tr>
          </thead>
          <tbody>
            {entries.map((e) => (
              <tr key={e.id}>
                <td>{new Date(e.date).toLocaleDateString("pt-PT")}</td>
                <td>{e.label}</td>
                <td>{e.location}</td>
                <td>{STYLE_LABEL[e.style] || e.style}</td>
                <td>
                  <div className="admin-table-actions">
                    <Link href={`/admin/drift-virtual/calendario/${e.id}/editar`} className="admin-link-btn">Editar</Link>
                    <form action={deleteCalendarEntry.bind(null, e.id)}>
                      <button type="submit" className="admin-link-btn danger">Apagar</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {entries.length === 0 && <tr><td colSpan={5}>Ainda não há sessões no calendário.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
