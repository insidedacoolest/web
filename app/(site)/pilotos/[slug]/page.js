import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "../../../lib/db";
import { driverToView } from "../../../lib/transform";
import DriverCard from "../../../components/DriverCard";
import { getLocale } from "../../../lib/i18n";

export async function generateStaticParams() {
  const drivers = await prisma.driver.findMany({ select: { slug: true } });
  return drivers.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const driver = await prisma.driver.findUnique({ where: { slug } });
  if (!driver) return { title: "Piloto — Drift Factory" };
  return {
    title: `${driver.firstName} ${driver.lastName} — Drift Factory`,
    description: `Perfil de ${driver.firstName} ${driver.lastName}: ${driver.team}, ${driver.car}. Estatísticas e histórico de carreira.`,
  };
}

export default async function DriverPage({ params }) {
  const locale = await getLocale();
  const { slug } = await params;
  const row = await prisma.driver.findUnique({ where: { slug } });
  if (!row) notFound();
  const driver = driverToView(row, locale);

  const otherRows = await prisma.driver.findMany({
    where: { slug: { not: slug } },
    orderBy: { standing: "asc" },
    take: 4,
  });
  const others = otherRows.map((d) => driverToView(d, locale));

  return (
    <>
      <section className="page-hero driver-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Início</Link> / <Link href="/pilotos">Pilotos</Link> / {driver.name}
          </div>

          <div className="driver-hero-top">
            {driver.imageUrl && (
              <img src={driver.imageUrl} alt={driver.name} className="driver-hero-photo" />
            )}
            <div className="driver-hero-id">
              <span className="eyebrow">{driver.flag} {driver.nationality}</span>
              <h1 className="display h1 driver-hero-name">
                {driver.firstName}
                <br />
                {driver.lastName}
              </h1>
              <div className="driver-tags" style={{ marginTop: "1rem" }}>
                {driver.champs.map((c) => <span className="tag-chip" key={c}>{c}</span>)}
                <span className="tag-chip">{driver.cats.includes("pro") ? "Pro" : "Rookie"}</span>
                <span className="tag-chip">{driver.team}</span>
              </div>
            </div>
            <div className="driver-hero-num" aria-hidden="true">{driver.num}</div>
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="container">
          <div className="grid grid-2">
            <div className="info-panel">
              <h3 className="info-panel-title">Informação</h3>
              <dl className="info-list">
                <div><dt>Nacionalidade</dt><dd>{driver.flag} {driver.nationality}</dd></div>
                <div><dt>Data de nascimento</dt><dd>{driver.birthDate}</dd></div>
                <div><dt>Naturalidade</dt><dd>{driver.born}</dd></div>
              </dl>
              <a href={driver.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm" style={{ marginTop: "1.2rem" }}>
                Ver perfil no Instagram
              </a>
            </div>

            <div className="info-panel">
              <h3 className="info-panel-title">Carro</h3>
              <dl className="info-list">
                <div><dt>Modelo</dt><dd>{driver.car}</dd></div>
                <div><dt>Potência</dt><dd>{driver.power} CV</dd></div>
                <div><dt>Número de arranque</dt><dd>#{driver.num}</dd></div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="section tight section-alt">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow pink">Época 2026</span>
              <h2 className="display h2">Carreira</h2>
            </div>
          </div>

          <div className="stat-strip" style={{ marginBottom: "2.2rem" }}>
            <div className="hero-stat"><b>{driver.standing}º</b><span>Posição atual</span></div>
            <div className="hero-stat"><b>{driver.points}</b><span>Pontos</span></div>
            <div className="hero-stat"><b>{driver.bestStanding}º</b><span>Melhor posição</span></div>
            <div className="hero-stat"><b>{driver.wins}</b><span>Vitórias</span></div>
            <div className="hero-stat"><b>{driver.podiums}</b><span>Pódios</span></div>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Época</th><th>Posição</th><th className="num">Pontos</th></tr>
              </thead>
              <tbody>
                {driver.history.map((h) => (
                  <tr key={h.season}>
                    <td>{h.season}</td>
                    <td>{h.standing}º</td>
                    <td className="num">{h.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Sobre</span>
              <h2 className="display h2">{driver.firstName} {driver.lastName}</h2>
            </div>
          </div>
          <p className="lede" style={{ maxWidth: "70ch" }}>{driver.bio}</p>
        </div>
      </section>

      {others.length > 0 && (
        <section className="section tight section-alt">
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow pink">Grelha</span>
                <h2 className="display h2">Outros pilotos</h2>
              </div>
              <Link href="/pilotos" className="btn btn-outline btn-sm">Ver todos</Link>
            </div>
            <div className="grid grid-4">
              {others.map((d) => <DriverCard driver={d} key={d.slug} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
