import Link from "next/link";
import FilterGroup from "../../components/FilterGroup";
import IconGlyph from "../../components/IconGlyph";
import { prisma } from "../../lib/db";
import { newsToView } from "../../lib/transform";
import { NEWS_ICONS } from "../../lib/icons";
import { getLocale } from "../../lib/i18n";

export const metadata = {
  title: "Notícias — Drift Factory",
  description: "As últimas notícias do drift em Portugal e na Europa — campeonatos, pilotos e bastidores.",
};

const PILLS = [
  { value: "all", label: "Todas" },
  { value: "cpd", label: "CPD" },
  { value: "dmec", label: "DMEC" },
  { value: "cfd", label: "CFD" },
  { value: "dss", label: "DSS" },
  { value: "internacional", label: "Internacional" },
  { value: "tecnica", label: "Técnica" },
];

export default async function NoticiasPage() {
  const locale = await getLocale();
  const rows = await prisma.newsArticle.findMany({ orderBy: [{ publishedAt: "desc" }, { id: "desc" }] });
  const news = rows.map((n) => newsToView(n, locale));

  const items = news.map((n) => ({
    key: n.id,
    cats: n.cats,
    content: (
      <article className="card">
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
    ),
  }));

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Início</Link> / Notícias</div>
          <span className="eyebrow">Feed</span>
          <h1 className="display h1">Notícias</h1>
          <p className="lede" style={{ marginTop: ".8rem" }}>
            As últimas novidades do drift em Portugal e na Europa.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {news.length === 0 ? (
            <p className="lede">Ainda não há notícias publicadas.</p>
          ) : (
            <FilterGroup pills={PILLS} items={items} gridClass="grid grid-3" />
          )}
        </div>
      </section>
    </>
  );
}
