import Link from "next/link";
import { requireAdmin } from "../../../lib/authGuard";
import EventForm from "../EventForm";
import { createEvent } from "../actions";

export const metadata = { title: "Novo evento — Painel Drift Factory" };

export default async function NovoEventoPage() {
  await requireAdmin();
  return (
    <>
      <div className="admin-content-head">
        <div>
          <h1>Novo evento</h1>
          <p><Link href="/admin/calendario">← Voltar ao calendário</Link></p>
        </div>
      </div>
      <EventForm action={createEvent} submitLabel="Criar evento" />
    </>
  );
}
