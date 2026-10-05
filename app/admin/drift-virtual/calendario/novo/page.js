import Link from "next/link";
import { requireAdmin } from "../../../../lib/authGuard";
import CalendarEntryForm from "../CalendarEntryForm";
import { createCalendarEntry } from "../actions";

export const metadata = { title: "Nova sessão — Painel Drift Factory" };

export default async function NovaSessaoPage() {
  await requireAdmin();
  return (
    <>
      <div className="admin-content-head">
        <div>
          <h1>Nova sessão</h1>
          <p><Link href="/admin/drift-virtual/calendario">← Voltar ao calendário</Link></p>
        </div>
      </div>
      <CalendarEntryForm action={createCalendarEntry} submitLabel="Criar sessão" />
    </>
  );
}
