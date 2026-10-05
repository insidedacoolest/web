export default function PartnersCarousel({ partners }) {
  if (partners.length === 0) return null;

  return (
    <div className="partners-row">
      {partners.map((p) => (
        <a
          key={p.id}
          href={p.link}
          target="_blank"
          rel="noopener noreferrer sponsored"
          aria-label={p.name}
        >
          <img src={p.logoUrl} alt={p.name} />
        </a>
      ))}
    </div>
  );
}
