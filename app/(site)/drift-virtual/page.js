import Link from "next/link";
import MonthCalendar from "../../components/MonthCalendar";
import { prisma } from "../../lib/db";

export const metadata = {
  title: "Drift Virtual — Drift Factory",
  description: "A liga de drift virtual da Drift Factory — Assetto Corsa",
};

function posClass(pos) {
  if (pos === 1) return "pos p1";
  if (pos === 2) return "pos p2";
  if (pos === 3) return "pos p3";
  return "pos";
}

export default async function DriftVirtualPage() {
  const [leaderboard, banner, nextSession, calendarEvents] = await Promise.all([
    prisma.leaderboardEntry.findMany({ orderBy: { pos: "asc" } }),
    prisma.banner.findFirst({ where: { slot: "drift_virtual_hero" }, orderBy: { updatedAt: "desc" } }),
    prisma.virtualSession.findFirst(),
    prisma.virtualCalendarEvent.findMany({ orderBy: { date: "asc" } }),
  ]);

  const now = new Date();
  const sessionTitle = nextSession?.title || "Liga de sexta-feira — Ebisu Minami";
  const sessionDetails = nextSession?.details || "Qualificação às 21h00 · Batalhas às 22h00 · Voz no Discord";
  const sessionDiscordUrl = nextSession?.discordUrl || "#";

  return (
    <>
      <section
        className={`hero${banner ? " hero-has-photo" : ""}`}
        style={{ paddingBottom: "4rem", ...(banner ? { backgroundImage: `url(${banner.imageUrl})`, backgroundPosition: banner.position } : {}) }}
      >
        {banner && <div className="hero-scrim" />}
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="eyebrow pink">Sim racing</span>
            <h1 className="display h1">
              Drift
              <br />
              Virtual.
            </h1>
            <p className="lede">
              A pista nunca fecha. Compete online em Assetto Corsa, sobe no
              leaderboard semanal e junta-te aos eventos ao vivo com a
              comunidade Drift Factory.
            </p>
            <div className="hero-actions">
              <a href={sessionDiscordUrl} className="btn btn-pink">Entrar no Discord</a>
              <a href="#leaderboard" className="btn btn-outline">Ver leaderboard</a>
            </div>
          </div>
          {!banner && (
            <div className="hero-visual">
              <div className="hero-frame">
                <svg viewBox="0 0 200 200" fill="none" stroke="var(--pink)" strokeWidth="2.4">
                  <rect x="30" y="60" width="140" height="30" rx="10" stroke="var(--line)" />
                  <circle cx="60" cy="118" r="16" />
                  <circle cx="140" cy="118" r="16" />
                  <path d="M60 60 L80 30 L120 30 L140 60" />
                  <circle cx="100" cy="75" r="4" fill="var(--pink)" stroke="none" />
                </svg>
                <span className="tag">Online agora</span>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div><span className="eyebrow">Como funciona</span><h2 className="display h2">Uma liga, três formatos</h2></div>
            <Link href="/drift-virtual/regulamento" className="btn btn-outline btn-sm">Ver regulamento</Link>
          </div>
          <div className="feature-list grid grid-3" style={{ alignItems: "start" }}>
            <div className="feature-item">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M8 10v4M6 12h4M15 10l2 2-2 2M19 12h-2" /></svg>
              </div>
              <div><h4>Leaderboard Semanal</h4><p>Sessões abertas no nosso servidor online, livres ou pontuáveis, prova que mereces o top 16 à sexta-feira</p></div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" /></svg>
              </div>
              <div><h4>Sextas de Batalha</h4><p>Sextas-feiras são dias de batalhas. Os melhores 16 pilotos da Leaderboard semanal competem entre si, em batalhas.</p></div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
              </div>
              <div><h4>Campeonato Anual</h4><p>Os melhores 32 pilotos da Leaderboard semanal e Sextas de Batalha competem em 5 rondas anuais para garantir o derradeiro campeão.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="leaderboard">
        <div className="container">
          <div className="section-head">
            <div><span className="eyebrow pink">Esta semana</span><h2 className="display h2">Leaderboard</h2></div>
            <span className="lede" style={{ margin: 0 }}>Assetto Corsa · Ebisu Minami</span>
          </div>
          <div className="vs-panel">
            {leaderboard.length === 0 && <p className="lede">Ainda não há entradas no leaderboard.</p>}
            {leaderboard.map((row) => (
              <div className="leaderboard-row" key={row.id}>
                <span className={posClass(row.pos)} style={{ fontFamily: "var(--font-display)" }}>{row.pos}</span>
                <span className="name">{row.name} <span className="platform">{row.platform}</span></span>
                <span className="platform">Solo run</span>
                <span className="score">{row.score}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div><span className="eyebrow pink">Sessões</span><h2 className="display h2">Calendário</h2></div>
          </div>
          <MonthCalendar year={now.getFullYear()} month={now.getMonth()} events={calendarEvents} />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="cta-band">
            <div>
              <span className="eyebrow">Próxima sessão</span>
              <h2 className="h3" style={{ marginTop: ".5rem", fontFamily: "var(--font-head)", textTransform: "uppercase" }}>
                {sessionTitle}
              </h2>
              <p className="lede" style={{ marginTop: ".5rem" }}>{sessionDetails}</p>
            </div>
            <a href={sessionDiscordUrl} className="btn btn-pink">Entrar no Discord</a>
          </div>
        </div>
      </section>
    </>
  );
}
