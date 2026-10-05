import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "../../../../lib/authGuard";
import { prisma } from "../../../../lib/db";
import EventForm from "../../EventForm";
import { updateEvent, deleteEvent } from "../../actions";

export const metadata = { title: "Editar evento — Painel Drift Factory" };

export default async function EditarEventoPage({ params }) {
  await requireAdmin();
  const { id } = await params;
  const event = await prisma.calendarEvent.findUnique({ where: { id: Number(id) } });
  if (!event) notFound();

  const updateWithId = updateEvent.bind(null, event.id);
  const deleteWithId = deleteEvent.bind(null, event.id);

  return (
    <>
      <div className="admin-content-head">
        <div>
          <h1>Editar evento</h1>
          <p><Link href="/admin/calendario">← Voltar ao calendário</Link></p>
        </div>
      </div>
      <EventForm action={updateWithId} initial={event} submitLabel="Guardar alterações" />

      <div className="admin-subsection">
        <h3 className="info-panel-title">Zona de perigo</h3>
        <form action={deleteWithId}>
          <button type="submit" className="admin-link-btn danger">Apagar este evento</button>
        </form>
      </div>
    </>
  );
}
