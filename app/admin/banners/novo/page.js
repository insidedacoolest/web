import Link from "next/link";
import { requireAdmin } from "../../../lib/authGuard";
import BannerForm from "../BannerForm";
import { createBanner } from "../actions";

export const metadata = { title: "Novo banner — Painel Drift Factory" };

export default async function NovoBannerPage() {
  await requireAdmin();
  return (
    <>
      <div className="admin-content-head">
        <div>
          <h1>Novo banner</h1>
          <p><Link href="/admin/banners">← Voltar aos banners</Link></p>
        </div>
      </div>
      <BannerForm action={createBanner} submitLabel="Criar banner" requireImage />
    </>
  );
}
