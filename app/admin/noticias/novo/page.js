import Link from "next/link";
import { requireAdmin } from "../../../lib/authGuard";
import NewsForm from "../NewsForm";
import { createNews } from "../actions";

export const metadata = { title: "Nova notícia — Painel Drift Factory" };

export default async function NovaNoticiaPage() {
  await requireAdmin();
  return (
    <>
      <div className="admin-content-head">
        <div>
          <h1>Nova notícia</h1>
          <p><Link href="/admin/noticias">← Voltar às notícias</Link></p>
        </div>
      </div>
      <NewsForm action={createNews} submitLabel="Criar notícia" />
    </>
  );
}
