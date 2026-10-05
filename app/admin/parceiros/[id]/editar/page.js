import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "../../../../lib/authGuard";
import { prisma } from "../../../../lib/db";
import PartnerForm from "../../PartnerForm";
import { updatePartner, deletePartner } from "../../actions";

export const metadata = { title: "Editar parceiro — Painel Drift Factory" };

export default async function EditarParceiroPage({ params }) {
  await requireAdmin();
  const { id } = await params;
  const partner = await prisma.partner.findUnique({ where: { id: Number(id) } });
  if (!partner) notFound();

  const updateWithId = updatePartner.bind(null, partner.id);
  const deleteWithId = deletePartner.bind(null, partner.id);

  return (
    <>
      <div className="admin-content-head">
        <div>
          <h1>Editar parceiro</h1>
          <p><Link href="/admin/parceiros">← Voltar aos parceiros</Link></p>
        </div>
      </div>
      <PartnerForm action={updateWithId} initial={partner} submitLabel="Guardar alterações" />

      <div className="admin-subsection">
        <h3 className="info-panel-title">Zona de perigo</h3>
        <form action={deleteWithId}>
          <button type="submit" className="admin-link-btn danger">Apagar este parceiro</button>
        </form>
      </div>
    </>
  );
}
