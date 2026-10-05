import Link from "next/link";
import { requireAdmin } from "../../lib/authGuard";
import { prisma } from "../../lib/db";
import { deletePartner } from "./actions";

const MAX_PARTNERS = 5;

export const metadata = { title: "Parceiros — Painel Drift Factory" };

export default async function AdminParceirosPage() {
  await requireAdmin();
  const partners = await prisma.partner.findMany({ orderBy: { order: "asc" } });

  return (
    <>
      <div className="admin-content-head">
        <div>
          <h1>Parceiros</h1>
          <p>Logótipos com hiperligação mostrados no carrossel de parceiros da página inicial (máximo {MAX_PARTNERS}).</p>
        </div>
      </div>

      <div className="admin-toolbar">
        {partners.length < MAX_PARTNERS ? (
          <Link href="/admin/parceiros/novo" className="btn btn-lime btn-sm">Novo parceiro</Link>
        ) : (
          <span className="admin-hint">Já tens {MAX_PARTNERS} parceiros (o máximo). Apaga um para adicionar outro.</span>
        )}
      </div>

      <div className="admin-row-list">
        {partners.map((p) => (
          <div className="admin-row-item" key={p.id} style={{ gridTemplateColumns: "80px 1fr auto" }}>
            <img src={p.logoUrl} alt="" className="admin-image-preview" style={{ width: 70, height: 70, marginBottom: 0, objectFit: "contain" }} />
            <div>
              <strong>{p.name}</strong>
              <div className="admin-hint">{p.link} · ordem: {p.order}</div>
            </div>
            <div className="admin-table-actions">
              <Link href={`/admin/parceiros/${p.id}/editar`} className="admin-link-btn">Editar</Link>
              <form action={deletePartner.bind(null, p.id)}>
                <button type="submit" className="admin-link-btn danger">Apagar</button>
              </form>
            </div>
          </div>
        ))}
        {partners.length === 0 && <p className="lede">Ainda não há parceiros.</p>}
      </div>
    </>
  );
}
