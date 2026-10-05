import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "../../../../lib/authGuard";
import { prisma } from "../../../../lib/db";
import EntryForm from "../../EntryForm";
import { updateEntry, deleteEntry } from "../../actions";

export const metadata = { title: "Editar entrada — Painel Drift Factory" };

export default async function EditarEntradaPage({ params }) {
  await requireAdmin();
  const { id } = await params;
  const entry = await prisma.leaderboardEntry.findUnique({ where: { id: Number(id) } });
  if (!entry) notFound();

  const updateWithId = updateEntry.bind(null, entry.id);
  const deleteWithId = deleteEntry.bind(null, entry.id);

  return (
    <>
      <div className="admin-content-head">
        <div>
          <h1>Editar entrada</h1>
          <p><Link href="/admin/drift-virtual">← Voltar ao Drift Virtual</Link></p>
        </div>
      </div>
      <EntryForm action={updateWithId} initial={entry} submitLabel="Guardar alterações" />

      <div className="admin-subsection">
        <h3 className="info-panel-title">Zona de perigo</h3>
        <form action={deleteWithId}>
          <button type="submit" className="admin-link-btn danger">Apagar esta entrada</button>
        </form>
      </div>
    </>
  );
}
