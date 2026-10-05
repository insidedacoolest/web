import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "../../../../lib/authGuard";
import { prisma } from "../../../../lib/db";
import RoundForm from "../../RoundForm";
import { updateRound, deleteRound } from "../../actions";

export const metadata = { title: "Editar tabela — Painel Drift Factory" };

export default async function EditarRondaPage({ params }) {
  await requireAdmin();
  const { id } = await params;
  const round = await prisma.resultRound.findUnique({ where: { id: Number(id) } });
  if (!round) notFound();

  const updateWithId = updateRound.bind(null, round.id);
  const deleteRoundWithId = deleteRound.bind(null, round.id);

  return (
    <>
      <div className="admin-content-head">
        <div>
          <h1>Editar tabela</h1>
          <p><Link href="/admin/resultados">← Voltar aos resultados</Link></p>
        </div>
      </div>
      <RoundForm action={updateWithId} initial={round} submitLabel="Guardar alterações" />

      <div className="admin-subsection">
        <h3 className="info-panel-title">Zona de perigo</h3>
        <form action={deleteRoundWithId}>
          <button type="submit" className="admin-link-btn danger">Apagar esta tabela</button>
        </form>
      </div>
    </>
  );
}
