import Link from "next/link";
import { requireAdmin } from "../../lib/authGuard";
import { prisma } from "../../lib/db";
import { deleteNews } from "./actions";

export const metadata = { title: "Notícias — Painel Drift Factory" };

export default async function AdminNoticiasPage() {
  await requireAdmin();
  const news = await prisma.newsArticle.findMany({ orderBy: [{ publishedAt: "desc" }, { id: "desc" }] });

  return (
    <>
      <div className="admin-content-head">
        <div>
          <h1>Notícias</h1>
          <p>{news.length} artigo(s) publicados no site.</p>
        </div>
      </div>

      <div className="admin-toolbar">
        <Link href="/admin/noticias/novo" className="btn btn-lime btn-sm">Nova notícia</Link>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Título</th><th>Badge</th><th>Categorias</th><th>Data</th><th></th></tr>
          </thead>
          <tbody>
            {news.map((n) => (
              <tr key={n.id}>
                <td>{n.title}</td>
                <td>{n.badge}</td>
                <td>{n.catsCsv}</td>
                <td>{n.dateLabel}</td>
                <td>
                  <div className="admin-table-actions">
                    <Link href={`/admin/noticias/${n.id}/editar`} className="admin-link-btn">Editar</Link>
                    <form action={deleteNews.bind(null, n.id)}>
                      <button type="submit" className="admin-link-btn danger">Apagar</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {news.length === 0 && (
              <tr><td colSpan={5}>Ainda não há notícias.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
