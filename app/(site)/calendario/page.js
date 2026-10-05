import Link from "next/link";
import Countdown from "../../components/Countdown";
import { prisma } from "../../lib/db";
import { eventStatus, pickNextEvent } from "../../lib/calendar";

export const metadata = {
  title: "Calendário — Drift Factory",
  description: "Calendário da época de drift 2026 — CPD, DMEC, CFD e DSS.",
};

const STATUS_LABEL = { done: "Concluído", live: "Em breve", scheduled: "Agendado" };

export default async function CalendarioPage() {
  const rows = await prisma.calendarEvent.findMany({ orderBy: { fullDate: "asc" } });
  const events = rows.map((e) => ({ ...e, computedStatus: eventStatus(e) }));

  const nextEvent = pickNextEvent(events);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Início</Link> / Calendário</div>
          <span className="eyebrow">Época 2026</span>
          <h1 className="display h1">Calendário</h1>
          <p className="lede" style={{ marginTop: ".8rem" }}>
            As datas da época — confirma sempre a informação oficial de cada organização.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {nextEvent && (
            <div className="cta-band" style={{ marginBottom: "3rem" }}>
              <div>
                <span className="eyebrow">Próximo evento</span>
                <h2 className="h3" style={{ marginTop: ".5rem", fontFamily: "var(--font-head)", textTransform: "uppercase" }}>
                  {nextEvent.title}
                </h2>
              </div>
              <Countdown target={nextEvent.fullDate.toISOString()} />
            </div>
          )}

          {events.length === 0 ? (
            <p className="lede">Ainda não há eventos no calendário.</p>
          ) : (
            <div className="timeline">
              {events.map((e) => (
                <div className={`tl-item${e.computedStatus === "done" ? " done" : ""}`} key={e.id}>
                  <div className="tl-card">
                    <div className="tl-date">{e.month}<br />{e.day}</div>
                    <div className="tl-info">
                      <h3>{e.title}</h3>
                      <p>{e.desc}</p>
                    </div>
                    <span className={`tl-status${e.computedStatus !== "scheduled" ? ` ${e.computedStatus}` : ""}`}>
                      {STATUS_LABEL[e.computedStatus] ?? e.computedStatus}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
