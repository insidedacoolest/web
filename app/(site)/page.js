import Link from "next/link";
import Countdown from "../components/Countdown";
import NewsletterForm from "../components/NewsletterForm";
import DriverCard from "../components/DriverCard";
import PartnersCarousel from "../components/PartnersCarousel";
import IconGlyph from "../components/IconGlyph";
import { prisma } from "../lib/db";
import { driverToView, newsToView } from "../lib/transform";
import { NEWS_ICONS } from "../lib/icons";
import { getLocale } from "../lib/i18n";
import { DICT } from "../lib/dict";
import { pickNextEvent } from "../lib/calendar";

export default async function HomePage() {
  const locale = await getLocale();
  const t = DICT.home[locale] || DICT.home.pt;

  const [newsRows, champs, driverRows, events, driverCount, banners, partners] = await Promise.all([
    prisma.newsArticle.findMany({ orderBy: [{ publishedAt: "desc" }, { id: "desc" }], take: 5 }),
    prisma.championship.findMany({ orderBy: { id: "asc" }, take: 4 }),
    prisma.driver.findMany({ orderBy: [{ featured: "desc" }, { standing: "asc" }], take: 4 }),
    prisma.calendarEvent.findMany({ orderBy: { fullDate: "asc" } }),
    prisma.driver.count(),
    prisma.banner.findMany({ where: { slot: { in: ["home_hero", "home_virtual"] } }, orderBy: { updatedAt: "desc" } }),
    prisma.partner.findMany({ orderBy: { order: "asc" }, take: 5 }),
  ]);

  const heroBanner = banners.find((b) => b.slot === "home_hero");
  const virtualBanner = banners.find((b) => b.slot === "home_virtual");

  const news = newsRows.map((n) => newsToView(n, locale));
  const drivers = driverRows.map((d) => driverToView(d, locale));
  const featuredNews = news.slice(0, 3);
  const ticker = news.length > 0 ? news.map((n) => `${n.badge} — ${n.title}`) : [t.welcome];

  const nextEvent = pickNextEvent(events);

  return (
    <>
      <div className="ticker-bar">
        <div className="ticker-track">
          {[...ticker, ...ticker].map((tk, i) => (
            <span key={i}>{tk}</span>
          ))}
        </div>
      </div>

      <section
        className={`hero${heroBanner ? " hero-has-photo" : ""}`}
        style={heroBanner ? { backgroundImage: `url(${heroBanner.imageUrl})`, backgroundPosition: heroBanner.position } : undefined}
      >
        {heroBanner && <div className="hero-scrim" />}
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">{t.eyebrow}</span>
            <h1 className="display h1">
              {t.h1a}
              <br />
              {t.h1b} <span className="text-gradient">{t.h1c}</span>
              <br />
              {t.h1d}
            </h1>
            <p className="lede">{t.lede}</p>
            <div className="hero-actions">
              <Link href="/noticias" className="btn btn-lime">{t.ctaNews}</Link>
              <Link href="/campeonatos" className="btn btn-outline">{t.ctaChamps}</Link>
            </div>
            <div className="hero-stats">
              <div className="hero-stat"><b>{champs.length}</b><span>{t.statChamps}</span></div>
              <div className="hero-stat"><b>{driverCount}</b><span>{t.statDrivers}</span></div>
              <div className="hero-stat"><b>{events.length}</b><span>{t.statEvents}</span></div>
            </div>
          </div>

          {!heroBanner && (
            <div className="hero-visual">
              <div className="hero-frame">
                <svg viewBox="0 0 200 200" fill="none" stroke="var(--lime)" strokeWidth="2.4">
                  <circle cx="100" cy="100" r="70" stroke="var(--line)" />
                  <circle cx="100" cy="100" r="70" strokeDasharray="6 10" stroke="var(--pink)" opacity=".6" />
                  <path d="M40 128 C 60 70, 140 70, 160 128" />
                  <circle cx="62" cy="132" r="14" />
                  <circle cx="140" cy="132" r="14" />
                  <path d="M60 100 L 100 60 L 150 100" stroke="var(--pink)" />
                </svg>
                <span className="tag">{t.seasonTag}</span>
              </div>
              <svg className="corner-flag" viewBox="0 0 40 40">
                <g fill="var(--text)">
                  <rect x="0" y="0" width="10" height="10" /><rect x="20" y="0" width="10" height="10" />
                  <rect x="10" y="10" width="10" height="10" /><rect x="30" y="10" width="10" height="10" />
                  <rect x="0" y="20" width="10" height="10" /><rect x="20" y="20" width="10" height="10" />
                  <rect x="10" y="30" width="10" height="10" /><rect x="30" y="30" width="10" height="10" />
                </g>
              </svg>
            </div>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">{t.newsEyebrow}</span>
              <h2 className="display h2">{t.newsTitle}</h2>
            </div>
            <Link href="/noticias" className="btn btn-outline btn-sm">{DICT.common[locale]?.viewAllNews || DICT.common.pt.viewAllNews}</Link>
          </div>

          {featuredNews.length === 0 ? (
            <p className="lede">{t.noNews}</p>
          ) : (
            <div className="grid grid-3">
              {featuredNews.map((n) => (
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
                    <Link href={`/noticias/${n.id}`} className="card-link">{t.readNews}</Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow pink">{t.champsEyebrow}</span>
              <h2 className="display h2">{t.champsTitle}</h2>
            </div>
            <Link href="/campeonatos" className="btn btn-outline btn-sm">{DICT.common[locale]?.viewAll || DICT.common.pt.viewAll}</Link>
          </div>

          {champs.length === 0 ? (
            <p className="lede">{t.noChamps}</p>
          ) : (
            <div className="grid grid-4">
              {champs.map((c) => (
                <div className="champ-card" data-code={c.code} key={c.code}>
                  <span className="champ-code">{c.code}</span>
                  <span className="champ-name">{c.name}</span>
                  <p className="champ-desc">{c.desc}</p>
                  <div className="champ-foot"><span>{c.rounds} rondas</span><span>2026</span></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {nextEvent && (
        <section className="section">
          <div className="container">
            <div className="cta-band">
              <div>
                <span className="eyebrow">{t.nextEventEyebrow}</span>
                <h2 className="h3" style={{ marginTop: ".5rem", fontFamily: "var(--font-head)", textTransform: "uppercase" }}>
                  {nextEvent.title}
                </h2>
                <p className="lede" style={{ marginTop: ".5rem" }}>{nextEvent.desc}</p>
              </div>
              <Countdown target={nextEvent.fullDate.toISOString()} />
              <Link href="/calendario" className="btn btn-lime">{DICT.common[locale]?.seeCalendar || DICT.common.pt.seeCalendar}</Link>
            </div>
          </div>
        </section>
      )}

      <section
        className={`section section-alt${virtualBanner ? " section-has-photo" : ""}`}
        style={virtualBanner ? { backgroundImage: `url(${virtualBanner.imageUrl})`, backgroundPosition: virtualBanner.position } : undefined}
      >
        {virtualBanner && <div className="hero-scrim" />}
        <div className="container hero-inner" style={{ gridTemplateColumns: ".9fr 1.1fr" }}>
          {!virtualBanner && (
            <div className="hero-visual" style={{ order: 2 }}>
              <div className="hero-frame">
                <svg viewBox="0 0 200 200" fill="none" stroke="var(--pink)" strokeWidth="2.4">
                  <rect x="40" y="40" width="120" height="120" rx="16" stroke="var(--line)" />
                  <path d="M70 130 L100 70 L130 130 M85 130 L100 100 L115 130" />
                  <circle cx="100" cy="100" r="46" strokeDasharray="4 8" opacity=".5" />
                </svg>
                <span className="tag">Sexta 21h00</span>
              </div>
            </div>
          )}
          <div className="hero-copy" style={{ order: 1 }}>
            <span className="eyebrow pink">{t.virtualEyebrow}</span>
            <h2 className="display h2">{t.virtualTitle}</h2>
            <p className="lede">{t.virtualLede}</p>
            <Link href="/drift-virtual" className="btn btn-pink">{t.virtualCta}</Link>
          </div>
        </div>
      </section>

      {partners.length > 0 && (
        <section className="section tight">
          <div className="container">
            <PartnersCarousel partners={partners} />
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">{t.driversEyebrow}</span>
              <h2 className="display h2">{t.driversTitle}</h2>
            </div>
            <Link href="/pilotos" className="btn btn-outline btn-sm">{DICT.common[locale]?.viewAllDrivers || DICT.common.pt.viewAllDrivers}</Link>
          </div>
          {drivers.length === 0 ? (
            <p className="lede">{t.noDrivers}</p>
          ) : (
            <div className="grid grid-4">
              {drivers.map((d) => (
                <DriverCard driver={d} key={d.slug} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="footer-newsletter" style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
            <span className="eyebrow" style={{ justifyContent: "center" }}>{t.newsletterEyebrow}</span>
            <h2 className="display h2" style={{ marginTop: ".6rem" }}>{t.newsletterTitle}</h2>
            <p className="lede" style={{ margin: ".8rem auto 1.4rem" }}>{t.newsletterLede}</p>
            <NewsletterForm center />
          </div>
        </div>
      </section>
    </>
  );
}
