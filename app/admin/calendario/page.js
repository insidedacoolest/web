import Link from "next/link";
import { requireAdmin } from "../../lib/authGuard";
import { prisma } from "../../lib/db";
import { deleteEvent } from "./actions";

export const metadata = { title: "Calendário — Painel Drift Factory" };

export default async function AdminCalendarioPage() {
  await requireAdmin();
  const events = await prisma.calendarEvent.findMany({ orderBy: { fullDate: "asc" } });

  return (
    <>
      <div className="admin-content-head">
        <div>
          <h1>Calendário</h1>
          <p>{events.length} evento(s) na época.</p>
        </div>
      </div>

      <div className="admin-toolbar">
        <Link href="/admin/calendario/novo" className="btn btn-lime btn-sm">Novo evento</Link>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Data</th><th>Título</th><th>Estado</th><th></th></tr>
          </thead>
          <tbody>
            {events.map((e) => (
              <tr key={e.id}>
                <td>{e.month} {e.day}</td>
                <td>{e.title}</td>
                <td>{e.status}</td>
                <td>
                  <div className="admin-table-actions">
                    <Link href={`/admin/calendario/${e.id}/editar`} className="admin-link-btn">Editar</Link>
                    <form action={deleteEvent.bind(null, e.id)}>
                      <button type="submit" className="admin-link-btn danger">Apagar</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {events.length === 0 && <tr><td colSpan={4}>Ainda não há eventos.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
