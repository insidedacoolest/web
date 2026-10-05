import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "../../../../../lib/authGuard";
import { prisma } from "../../../../../lib/db";
import StandingForm from "../../../StandingForm";
import { updateStanding, deleteStanding } from "../../../actions";

export const metadata = { title: "Editar entrada — Painel Drift Factory" };

export default async function EditarClassificacaoPage({ params }) {
  await requireAdmin();
  const { id } = await params;
  const standing = await prisma.standingEntry.findUnique({ where: { id: Number(id) } });
  if (!standing) notFound();

  const updateWithId = updateStanding.bind(null, standing.id);
  const deleteWithId = deleteStanding.bind(null, standing.id);

  return (
    <>
      <div className="admin-content-head">
        <div>
          <h1>Editar entrada</h1>
          <p><Link href="/admin/campeonatos">← Voltar aos campeonatos</Link></p>
        </div>
      </div>
      <StandingForm action={updateWithId} initial={standing} submitLabel="Guardar alterações" />

      <div className="admin-subsection">
        <h3 className="info-panel-title">Zona de perigo</h3>
        <form action={deleteWithId}>
          <button type="submit" className="admin-link-btn danger">Apagar esta entrada</button>
        </form>
      </div>
    </>
  );
}
