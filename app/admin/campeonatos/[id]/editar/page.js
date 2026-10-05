import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "../../../../lib/authGuard";
import { prisma } from "../../../../lib/db";
import ChampionshipForm from "../../ChampionshipForm";
import { updateChampionship, deleteChampionship } from "../../actions";

export const metadata = { title: "Editar campeonato — Painel Drift Factory" };

export default async function EditarCampeonatoPage({ params }) {
  await requireAdmin();
  const { id } = await params;
  const champ = await prisma.championship.findUnique({ where: { id: Number(id) } });
  if (!champ) notFound();

  const updateWithId = updateChampionship.bind(null, champ.id);
  const deleteWithId = deleteChampionship.bind(null, champ.id);

  return (
    <>
      <div className="admin-content-head">
        <div>
          <h1>Editar campeonato</h1>
          <p><Link href="/admin/campeonatos">← Voltar aos campeonatos</Link></p>
        </div>
      </div>
      <ChampionshipForm action={updateWithId} initial={champ} submitLabel="Guardar alterações" />

      <div className="admin-subsection">
        <h3 className="info-panel-title">Zona de perigo</h3>
        <form action={deleteWithId}>
          <button type="submit" className="admin-link-btn danger">Apagar este campeonato</button>
        </form>
      </div>
    </>
  );
}
