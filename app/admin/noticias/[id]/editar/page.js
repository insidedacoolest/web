import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "../../../../lib/authGuard";
import { prisma } from "../../../../lib/db";
import NewsForm from "../../NewsForm";
import { updateNews, deleteNews } from "../../actions";

export const metadata = { title: "Editar notícia — Painel Drift Factory" };

export default async function EditarNoticiaPage({ params }) {
  await requireAdmin();
  const { id } = await params;
  const article = await prisma.newsArticle.findUnique({ where: { id: Number(id) } });
  if (!article) notFound();

  const updateWithId = updateNews.bind(null, article.id);
  const deleteWithId = deleteNews.bind(null, article.id);

  return (
    <>
      <div className="admin-content-head">
        <div>
          <h1>Editar notícia</h1>
          <p><Link href="/admin/noticias">← Voltar às notícias</Link></p>
        </div>
      </div>
      <NewsForm action={updateWithId} initial={article} submitLabel="Guardar alterações" />

      <div className="admin-subsection">
        <h3 className="info-panel-title">Zona de perigo</h3>
        <form action={deleteWithId}>
          <button type="submit" className="admin-link-btn danger">Apagar esta notícia</button>
        </form>
      </div>
    </>
  );
}
