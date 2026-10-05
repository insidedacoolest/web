import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "../../../lib/db";
import { newsToView } from "../../../lib/transform";
import IconGlyph from "../../../components/IconGlyph";
import { NEWS_ICONS } from "../../../lib/icons";
import { getLocale } from "../../../lib/i18n";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const row = await prisma.newsArticle.findUnique({ where: { id: Number(id) } });
  if (!row) return { title: "Notícia — Drift Factory" };
  return {
    title: `${row.title} — Drift Factory`,
    description: row.excerpt,
  };
}

export default async function NewsDetailPage({ params }) {
  const locale = await getLocale();
  const { id } = await params;
  const numId = Number(id);
  if (!Number.isFinite(numId)) notFound();

  const row = await prisma.newsArticle.findUnique({ where: { id: numId } });
  if (!row) notFound();
  const news = newsToView(row, locale);

  const otherRows = await prisma.newsArticle.findMany({
    where: { id: { not: numId } },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });
  const others = otherRows.map((n) => newsToView(n, locale));

  const paragraphs = news.body
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Início</Link> / <Link href="/noticias">Notícias</Link> / {news.title}
          </div>
          <div className="card-meta" style={{ marginTop: "1rem" }}>
            <span className={`badge${news.badgePink ? " pink" : ""}`}>{news.badge}</span>
            <span>·</span>
            <span>{news.dateLabel}</span>
          </div>
          <h1 className="display h1" style={{ marginTop: "1rem" }}>{news.title}</h1>
          <p className="lede" style={{ marginTop: ".8rem", maxWidth: "none" }}>{news.excerpt}</p>
        </div>
      </section>

      <section className="section tight">
        <div className="container">
          {news.imageUrl ? (
            <img
              src={news.imageUrl}
              alt=""
              style={{ width: "100%", maxHeight: 480, objectFit: "cover", borderRadius: "var(--radius, 12px)", marginBottom: "2rem" }}
            />
          ) : (
            <div className={`card-media ${news.grad}`} style={{ height: 220, marginBottom: "2rem" }}>
              <IconGlyph recipe={NEWS_ICONS[news.icon] || NEWS_ICONS.target} />
            </div>
          )}

          {paragraphs.length > 0 && (
            <div>
              {paragraphs.map((p, i) => (
                <p className="lede" key={i} style={{ marginBottom: "1.2rem", maxWidth: "none" }}>{p}</p>
              ))}
            </div>
          )}
        </div>
      </section>

      {others.length > 0 && (
        <section className="section tight section-alt">
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow pink">Feed</span>
                <h2 className="display h2">Outras notícias</h2>
              </div>
              <Link href="/noticias" className="btn btn-outline btn-sm">Ver todas</Link>
            </div>
            <div className="grid grid-3">
              {others.map((n) => (
                <article className="card" key={n.id}>
                  <div className={`card-media ${n.grad}`}>
                    <span className={`badge${n.badgePink ? " pink" : ""}`}>{n.badge}</span>
                    {n.imageUrl ? (
                      <img src={n.imageUrl} alt="" />
                    ) : (
                      <IconGlyph recipe={NEWS_ICONS[n.icon] || NEWS_ICONS.target} />
                    )}
                  </div>
                  <div className="card-body">
                    <div className="card-meta"><span>{n.badge}</span><span>·</span><span>{n.dateLabel}</span></div>
                    <h3 className="card-title">{n.title}</h3>
                    <p className="card-excerpt">{n.excerpt}</p>
                    <Link href={`/noticias/${n.id}`} className="card-link">Ler notícia</Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
