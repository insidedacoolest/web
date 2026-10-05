import Link from "next/link";
import { requireAdmin } from "../../lib/authGuard";
import { prisma } from "../../lib/db";
import { deleteBanner } from "./actions";

export const metadata = { title: "Banners — Painel Drift Factory" };

export default async function AdminBannersPage() {
  await requireAdmin();
  const banners = await prisma.banner.findMany({ orderBy: { id: "desc" } });

  return (
    <>
      <div className="admin-content-head">
        <div>
          <h1>Banners</h1>
          <p>Imagens usadas nos destaques do site (hero da home, Drift Virtual, etc.).</p>
        </div>
      </div>

      <div className="admin-toolbar">
        <Link href="/admin/banners/novo" className="btn btn-lime btn-sm">Novo banner</Link>
      </div>

      <div className="admin-row-list">
        {banners.map((b) => (
          <div className="admin-row-item" key={b.id} style={{ gridTemplateColumns: "80px 1fr auto" }}>
            <img src={b.imageUrl} alt="" className="admin-image-preview" style={{ width: 70, height: 70, marginBottom: 0 }} />
            <div>
              <strong>{b.title}</strong>
              <div className="admin-hint">slot: {b.slot}</div>
            </div>
            <div className="admin-table-actions">
              <Link href={`/admin/banners/${b.id}/editar`} className="admin-link-btn">Editar</Link>
              <form action={deleteBanner.bind(null, b.id)}>
                <button type="submit" className="admin-link-btn danger">Apagar</button>
              </form>
            </div>
          </div>
        ))}
        {banners.length === 0 && <p className="lede">Ainda não há banners.</p>}
      </div>

      <div className="admin-subsection">
        <h3 className="info-panel-title">Slots disponíveis no site</h3>
        <p className="admin-hint" style={{ fontSize: ".85rem" }}>
          <code>home_hero</code> — imagem grande da secção inicial · <code>home_virtual</code> — secção &quot;Drift Virtual&quot; da home · <code>drift_virtual_hero</code> — topo da página Drift Virtual.
          Usa exatamente um destes valores no campo &quot;slot&quot; para o banner aparecer nesse sítio. Cria mais do que um com o mesmo slot e mostramos sempre o mais recente.
        </p>
      </div>
    </>
  );
}
