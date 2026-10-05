// Small, simplified flag icons (no emblems/seals) for the results table.
// Renders as a compact 20x14 SVG. Falls back to nothing if the country isn't mapped.

function Stripes({ dir, colors }) {
  const n = colors.length;
  return (
    <svg viewBox="0 0 30 20" width="20" height="14" aria-hidden="true">
      {colors.map((c, i) =>
        dir === "v" ? (
          <rect key={i} x={(30 / n) * i} y="0" width={30 / n} height="20" fill={c} />
        ) : (
          <rect key={i} x="0" y={(20 / n) * i} width="30" height={20 / n} fill={c} />
        )
      )}
    </svg>
  );
}

function Nordic({ bg, cross }) {
  return (
    <svg viewBox="0 0 30 20" width="20" height="14" aria-hidden="true">
      <rect width="30" height="20" fill={bg} />
      <rect x="10" width="5" height="20" fill={cross} />
      <rect y="7.5" width="30" height="5" fill={cross} />
    </svg>
  );
}

function GB() {
  return (
    <svg viewBox="0 0 30 20" width="20" height="14" aria-hidden="true">
      <rect width="30" height="20" fill="#00247D" />
      <path d="M0 0L30 20M30 0L0 20" stroke="#fff" strokeWidth="4" />
      <path d="M0 0L30 20M30 0L0 20" stroke="#CF142B" strokeWidth="1.6" />
      <path d="M15 0V20M0 10H30" stroke="#fff" strokeWidth="6" />
      <path d="M15 0V20M0 10H30" stroke="#CF142B" strokeWidth="3.2" />
    </svg>
  );
}

function Switzerland() {
  return (
    <svg viewBox="0 0 30 20" width="20" height="14" aria-hidden="true">
      <rect width="30" height="20" fill="#D52B1E" />
      <rect x="12.5" y="5" width="5" height="10" fill="#fff" />
      <rect x="10" y="7.5" width="10" height="5" fill="#fff" />
    </svg>
  );
}

function CzechRepublic() {
  return (
    <svg viewBox="0 0 30 20" width="20" height="14" aria-hidden="true">
      <rect width="30" height="10" fill="#fff" />
      <rect y="10" width="30" height="10" fill="#D7141A" />
      <path d="M0 0L15 10L0 20Z" fill="#11457E" />
    </svg>
  );
}

function Turkiye() {
  return (
    <svg viewBox="0 0 30 20" width="20" height="14" aria-hidden="true">
      <rect width="30" height="20" fill="#E30A17" />
      <circle cx="12" cy="10" r="5" fill="#fff" />
      <circle cx="13.5" cy="10" r="4" fill="#E30A17" />
      <path d="M17 10l4.5-1.5-2.8 3.8v-4.6l2.8 3.8Z" fill="#fff" />
    </svg>
  );
}

function China() {
  return (
    <svg viewBox="0 0 30 20" width="20" height="14" aria-hidden="true">
      <rect width="30" height="20" fill="#DE2910" />
      <path d="M6 3l1.2 3.6H11l-3 2.2 1.1 3.5L6 10.1 2.9 12.3 4 8.8 1 6.6h3.8Z" fill="#FFDE00" />
    </svg>
  );
}

function Israel() {
  return (
    <svg viewBox="0 0 30 20" width="20" height="14" aria-hidden="true">
      <rect width="30" height="20" fill="#fff" />
      <rect y="2.5" width="30" height="3" fill="#0038B8" />
      <rect y="14.5" width="30" height="3" fill="#0038B8" />
      <path d="M15 7l2 3.5h-4L15 7Zm0 6l-2-3.5h4L15 13Z" fill="none" stroke="#0038B8" strokeWidth="1" />
    </svg>
  );
}

function Cyprus() {
  return (
    <svg viewBox="0 0 30 20" width="20" height="14" aria-hidden="true">
      <rect width="30" height="20" fill="#fff" />
      <ellipse cx="15" cy="11" rx="7" ry="4" fill="#D4A017" />
    </svg>
  );
}

const H = (colors) => ({ Comp: Stripes, props: { dir: "h", colors } });
const V = (colors) => ({ Comp: Stripes, props: { dir: "v", colors } });
const N = (bg, cross) => ({ Comp: Nordic, props: { bg, cross } });

const FLAGS = {
  Poland: H(["#fff", "#DC143C"]),
  Ireland: V(["#169B62", "#fff", "#FF883E"]),
  Estonia: H(["#0072CE", "#000", "#fff"]),
  Latvia: H(["#9E3039", "#fff", "#9E3039"]),
  Finland: N("#fff", "#003580"),
  Lithuania: H(["#FDB913", "#006A44", "#C1272D"]),
  Hungary: H(["#CE2939", "#fff", "#477050"]),
  "El Salvador": H(["#0047AB", "#fff", "#0047AB"]),
  France: V(["#0055A4", "#fff", "#EF4135"]),
  "Czech Republic": { Comp: CzechRepublic, props: {} },
  Norway: N("#EF2B2D", "#002868"),
  Netherlands: H(["#AE1C28", "#fff", "#21468B"]),
  Switzerland: { Comp: Switzerland, props: {} },
  Ukraine: H(["#0057B7", "#FFD700"]),
  Cyprus: { Comp: Cyprus, props: {} },
  Denmark: N("#C60C30", "#fff"),
  Egypt: H(["#CE1126", "#fff", "#000"]),
  Türkiye: { Comp: Turkiye, props: {} },
  Italy: V(["#009246", "#fff", "#CE2B37"]),
  Spain: H(["#AA151B", "#F1BF00", "#AA151B"]),
  "United Kingdom": { Comp: GB, props: {} },
  Sweden: N("#005293", "#FECC02"),
  "People's Republic of China": { Comp: China, props: {} },
  Croatia: H(["#FF0000", "#fff", "#171796"]),
  Thailand: H(["#A51931", "#fff", "#2D2A4A", "#fff", "#A51931"]),
  Austria: H(["#ED2939", "#fff", "#ED2939"]),
  Germany: H(["#000", "#DD0000", "#FFCE00"]),
  Portugal: V(["#046A38", "#D4213D"]),
  Israel: { Comp: Israel, props: {} },
};

// Portuguese names (as used in our own Driver.nationality field) mapped to the English keys above.
const ALIASES = {
  Alemanha: "Germany",
  China: "People's Republic of China",
  Chipre: "Cyprus",
  Croácia: "Croatia",
  Dinamarca: "Denmark",
  Egito: "Egypt",
  "El Salvador": "El Salvador",
  Espanha: "Spain",
  Estónia: "Estonia",
  Finlândia: "Finland",
  França: "France",
  Hungria: "Hungary",
  Irlanda: "Ireland",
  Israel: "Israel",
  Itália: "Italy",
  Letónia: "Latvia",
  Lituânia: "Lithuania",
  Noruega: "Norway",
  "Países Baixos": "Netherlands",
  Polónia: "Poland",
  Portugal: "Portugal",
  "Reino Unido": "United Kingdom",
  "República Checa": "Czech Republic",
  Suécia: "Sweden",
  Suíça: "Switzerland",
  Tailândia: "Thailand",
  Turquia: "Türkiye",
  Ucrânia: "Ukraine",
  Áustria: "Austria",
};

export function CountryFlag({ country }) {
  const entry = FLAGS[country] || FLAGS[ALIASES[country]];
  if (!entry) return null;
  const { Comp, props } = entry;
  return <Comp {...props} />;
}
