import Link from "next/link";
import { requireAdmin } from "../../../lib/authGuard";
import EntryForm from "../EntryForm";
import { createEntry } from "../actions";

export const metadata = { title: "Nova entrada — Painel Drift Factory" };

export default async function NovaEntradaPage() {
  await requireAdmin();
  return (
    <>
      <div className="admin-content-head">
        <div>
          <h1>Nova entrada no leaderboard</h1>
          <p><Link href="/admin/drift-virtual">← Voltar ao Drift Virtual</Link></p>
        </div>
      </div>
      <EntryForm action={createEntry} submitLabel="Criar entrada" />
    </>
  );
}
