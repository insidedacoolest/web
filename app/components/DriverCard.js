import Link from "next/link";

export default function DriverCard({ driver }) {
  return (
    <Link href={`/pilotos/${driver.slug}`} className="driver-card driver-card-link">
      <div className="driver-photo">
        <span className="num">{driver.num}</span>
        {driver.imageUrl ? (
          <img src={driver.imageUrl} alt={driver.name} />
        ) : (
          <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="32" cy="32" r="24" /></svg>
        )}
        <span className="name-tag">{driver.name}</span>
      </div>
      <div className="driver-body">
        <div className="driver-name">{driver.name}</div>
        <div className="driver-team">{driver.team} · {driver.car}</div>
        <div className="driver-tags">
          {driver.champs.map((c) => <span className="tag-chip" key={c}>{c}</span>)}
          <span className="tag-chip">{driver.cats.includes("pro") ? "Pro" : "Rookie"}</span>
        </div>
      </div>
    </Link>
  );
}
