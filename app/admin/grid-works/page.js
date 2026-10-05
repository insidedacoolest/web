import Link from "next/link";
import { requireAdmin } from "../../lib/authGuard";
import { prisma } from "../../lib/db";

export const metadata = { title: "Grid Works — Painel Drift Factory" };

const STATUS_LABEL = { novo: "Novo", contactado: "Contactado", fechado: "Fechado" };
const SERVICE_LABEL = {
  logotipo: "Logótipo", livery: "Livery", "social-kit": "Kit de Redes Sociais", "social-management": "Gestão de Redes Sociais",
  merchandise: "Merchandise", website: "Website", varios: "Vários",
};

function serviceLabels(csv) {
  if (!csv) return "—";
  return csv.split(",").filter(Boolean).map((s) => SERVICE_LABEL[s] || s).join(", ") || "—";
}

export default async function AdminGridWorksPage() {
  await requireAdmin();
  const inquiries = await prisma.gridWorksInquiry.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <>
      <div className="admin-content-head">
        <div>
          <h1>Grid Works</h1>
          <p>{inquiries.length} pedido(s) de orçamento recebidos.</p>
        </div>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Data</th><th>Nome</th><th>Piloto/Equipa</th><th>Serviço</th><th>Estado</th><th></th></tr>
          </thead>
          <tbody>
            {inquiries.map((i) => (
              <tr key={i.id}>
                <td>{new Date(i.createdAt).toLocaleDateString("pt-PT")}</td>
                <td>{i.name}<br /><span className="admin-hint">{i.email}</span></td>
                <td>{i.team || "—"}</td>
                <td>{serviceLabels(i.service)}</td>
                <td>{STATUS_LABEL[i.status] || i.status}</td>
                <td>
                  <Link href={`/admin/grid-works/${i.id}`} className="admin-link-btn">Ver</Link>
                </td>
              </tr>
            ))}
            {inquiries.length === 0 && <tr><td colSpan={6}>Ainda não há pedidos.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
