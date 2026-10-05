import Link from "next/link";
import FilterGroup from "../../components/FilterGroup";
import DriverCard from "../../components/DriverCard";
import { prisma } from "../../lib/db";
import { driverToView } from "../../lib/transform";
import { getLocale } from "../../lib/i18n";

export const metadata = {
  title: "Pilotos — Drift Factory",
  description: "Conhece os pilotos da cena do drift português e europeu.",
};

const PILLS = [
  { value: "all", label: "Todos" },
  { value: "cpd", label: "CPD" },
  { value: "dmec", label: "DMEC" },
  { value: "cfd", label: "CFD" },
  { value: "dss", label: "DSS" },
  { value: "pro", label: "Pro" },
  { value: "rookie", label: "Rookie" },
];

export default async function PilotosPage() {
  const locale = await getLocale();
  const rows = await prisma.driver.findMany({ orderBy: { standing: "asc" } });
  const drivers = rows.map((d) => driverToView(d, locale));

  const items = drivers.map((d) => ({
    key: d.slug,
    cats: d.cats,
    content: <DriverCard driver={d} />,
  }));

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Início</Link> / Pilotos</div>
          <span className="eyebrow">Grelha</span>
          <h1 className="display h1">Pilotos</h1>
          <p className="lede" style={{ marginTop: ".8rem" }}>
            Carrega num piloto para ver o perfil completo.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {drivers.length === 0 ? (
            <p className="lede">Ainda não há pilotos registados.</p>
          ) : (
            <FilterGroup pills={PILLS} items={items} gridClass="grid grid-4" />
          )}
        </div>
      </section>
    </>
  );
}
