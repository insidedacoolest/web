import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "../../../lib/authGuard";
import { prisma } from "../../../lib/db";
import { updateInquiryStatus, deleteInquiry } from "../actions";

export const metadata = { title: "Pedido Grid Works — Painel Drift Factory" };

const SERVICE_LABEL = {
  logotipo: "Logótipo", livery: "Livery", "social-kit": "Kit de Redes Sociais", "social-management": "Gestão de Redes Sociais",
  merchandise: "Merchandise", website: "Website", varios: "Vários",
};

function serviceLabels(csv) {
  if (!csv) return "—";
  return csv.split(",").filter(Boolean).map((s) => SERVICE_LABEL[s] || s).join(", ") || "—";
}

export default async function AdminGridWorksInquiryPage({ params }) {
  await requireAdmin();
  const { id } = await params;
  const inquiry = await prisma.gridWorksInquiry.findUnique({ where: { id: Number(id) } });
  if (!inquiry) notFound();

  const updateWithId = updateInquiryStatus.bind(null, inquiry.id);
  const deleteWithId = deleteInquiry.bind(null, inquiry.id);

  return (
    <>
      <div className="admin-content-head">
        <div>
          <h1>Pedido de {inquiry.name}</h1>
          <p><Link href="/admin/grid-works">← Voltar aos pedidos Grid Works</Link></p>
        </div>
      </div>

      <div className="grid grid-2">
        <div className="info-panel">
          <h3 className="info-panel-title">Contacto</h3>
          <dl className="info-list">
            <div><dt>Nome</dt><dd>{inquiry.name}</dd></div>
            <div><dt>Email</dt><dd>{inquiry.email}</dd></div>
            <div><dt>Piloto/Equipa</dt><dd>{inquiry.team || "—"}</dd></div>
            <div><dt>Serviço(s)</dt><dd>{serviceLabels(inquiry.service)}</dd></div>
            <div><dt>Data</dt><dd>{new Date(inquiry.createdAt).toLocaleString("pt-PT")}</dd></div>
          </dl>
        </div>

        <div className="info-panel">
          <h3 className="info-panel-title">Estado</h3>
          <form action={updateWithId} className="admin-form">
            <label className="admin-field">
              <span>Estado do pedido</span>
              <select name="status" defaultValue={inquiry.status}>
                <option value="novo">Novo</option>
                <option value="contactado">Contactado</option>
                <option value="fechado">Fechado</option>
              </select>
            </label>
            <div className="admin-form-actions">
              <button type="submit" className="btn btn-lime btn-sm">Guardar estado</button>
            </div>
          </form>
        </div>
      </div>

      <div className="admin-subsection">
        <h3 className="info-panel-title">Mensagem</h3>
        <p className="lede" style={{ margin: 0 }}>{inquiry.message}</p>
      </div>

      <div className="admin-subsection">
        <h3 className="info-panel-title">Zona de perigo</h3>
        <form action={deleteWithId}>
          <button type="submit" className="admin-link-btn danger">Apagar este pedido</button>
        </form>
      </div>
    </>
  );
}
