import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "../../../../lib/authGuard";
import { prisma } from "../../../../lib/db";
import BannerForm from "../../BannerForm";
import { updateBanner, deleteBanner } from "../../actions";

export const metadata = { title: "Editar banner — Painel Drift Factory" };

export default async function EditarBannerPage({ params }) {
  await requireAdmin();
  const { id } = await params;
  const banner = await prisma.banner.findUnique({ where: { id: Number(id) } });
  if (!banner) notFound();

  const updateWithId = updateBanner.bind(null, banner.id);
  const deleteWithId = deleteBanner.bind(null, banner.id);

  return (
    <>
      <div className="admin-content-head">
        <div>
          <h1>Editar banner</h1>
          <p><Link href="/admin/banners">← Voltar aos banners</Link></p>
        </div>
      </div>
      <BannerForm action={updateWithId} initial={banner} submitLabel="Guardar alterações" />

      <div className="admin-subsection">
        <h3 className="info-panel-title">Zona de perigo</h3>
        <form action={deleteWithId}>
          <button type="submit" className="admin-link-btn danger">Apagar este banner</button>
        </form>
      </div>
    </>
  );
}
