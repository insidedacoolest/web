import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "../../../../../lib/authGuard";
import { prisma } from "../../../../../lib/db";
import CalendarEntryForm from "../../CalendarEntryForm";
import { updateCalendarEntry, deleteCalendarEntry } from "../../actions";

export const metadata = { title: "Editar sessão — Painel Drift Factory" };

export default async function EditarSessaoPage({ params }) {
  await requireAdmin();
  const { id } = await params;
  const entry = await prisma.virtualCalendarEvent.findUnique({ where: { id: Number(id) } });
  if (!entry) notFound();

  const updateWithId = updateCalendarEntry.bind(null, entry.id);
  const deleteWithId = deleteCalendarEntry.bind(null, entry.id);

  return (
    <>
      <div className="admin-content-head">
        <div>
          <h1>Editar sessão</h1>
          <p><Link href="/admin/drift-virtual/calendario">← Voltar ao calendário</Link></p>
        </div>
      </div>
      <CalendarEntryForm action={updateWithId} initial={entry} submitLabel="Guardar alterações" />

      <div className="admin-subsection">
        <h3 className="info-panel-title">Zona de perigo</h3>
        <form action={deleteWithId}>
          <button type="submit" className="admin-link-btn danger">Apagar esta sessão</button>
        </form>
      </div>
    </>
  );
}
