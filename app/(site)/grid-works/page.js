import Link from "next/link";
import GridWorksForm from "../../components/GridWorksForm";

export const metadata = {
  title: "Grid Works — Identidade e conteúdo para pilotos e equipas",
  description: "Logótipo, livery, kit de redes sociais, gestão de redes sociais, merchandise e website — tudo o que um piloto ou equipa de drift precisa para ter uma imagem à altura da pista.",
};

const SERVICES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" />
      </svg>
    ),
    title: "Logótipo",
    desc: "Identidade visual desenhada de raiz para ti ou para a tua equipa — pronta para o carro, o capacete, o fato e as redes sociais.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 13l1.5-5A2 2 0 016.4 6.5h11.2a2 2 0 011.9 1.5L21 13" />
        <rect x="2" y="13" width="20" height="5" rx="1.5" />
        <path d="M3 15.5h18" strokeDasharray="2 2" />
        <circle cx="7" cy="18.5" r="1.6" /><circle cx="17" cy="18.5" r="1.6" />
      </svg>
    ),
    title: "Livery",
    desc: "Decoração do carro — desde uma faixa simples a uma livery completa com patrocinadores, pronta para imprimir e aplicar na chapa.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
    title: "Kit de Redes Sociais",
    desc: "Templates e placeholders prontos a usar — capas, posts de resultados, anúncios de patrocínio, stories — mantendo sempre a tua identidade.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.462 8.077 4 12-1.786 1.264-3.924 1.958-6 2 2.914 1.879 6.161 2.019 9.038 1.006 3.235-1.14 5.858-3.586 7.048-6.79.582-1.526.874-3.144.914-4.765 0-.212 0-.42-.014-.63C21.28 6.4 22 4.01 22 4.01z" />
      </svg>
    ),
    title: "Gestão de Redes Sociais",
    desc: "Não é só o design — publicamos por ti. Calendário de conteúdo, publicações regulares e acompanhamento durante a época.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    ),
    title: "Merchandise",
    desc: "T-shirts, bonés e autocolantes com a tua marca — desde o design até ao produto pronto a vender aos teus fãs.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M8 4v5" />
      </svg>
    ),
    title: "Website",
    desc: "Um site próprio para ti ou para a tua equipa — perfil, resultados, loja e contactos, no mesmo estilo do resto do site.",
  },
];

export default function GridWorksPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Início</Link> / Grid Works</div>
          <span className="eyebrow pink">Serviços para pilotos e equipas</span>
          <h1 className="display h1">GRID WORKS</h1>
          <p className="lede" style={{ marginTop: ".8rem", maxWidth: "60ch" }}>
            A tua condução já impressiona na pista. Fazemos com que a tua imagem também
            impressione fora dela — logótipo, livery, redes sociais, merchandise e
            website, tratados por quem vive a cena do drift todos os dias.
          </p>
          <p className="lede" style={{ marginTop: "1rem", maxWidth: "60ch" }}>
            <strong>Feito por quem conhece o drift.</strong> Nascemos dentro da Drift
            Factory — sabemos o que um patrocinador quer ver, o que os fãs partilham, e
            o que faz um piloto destacar-se na grelha.
          </p>
          <div className="hero-actions" style={{ marginTop: "1.6rem" }}>
            <a href="#pedir-orcamento" className="btn btn-pink">Pedir orçamento</a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">O que fazemos</span>
              <h2 className="display h2">Seis serviços, uma equipa</h2>
            </div>
          </div>
          <div className="grid grid-3" style={{ alignItems: "start" }}>
            {SERVICES.map((s) => (
              <div className="feature-item" key={s.title}>
                <div className="feature-icon">{s.icon}</div>
                <div>
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt" id="pedir-orcamento">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Vamos a isto</span>
              <h2 className="display h2">Pedir orçamento</h2>
            </div>
          </div>
          <p className="lede" style={{ maxWidth: "60ch", marginBottom: "2rem" }}>
            Conta-nos sobre ti ou a tua equipa e o que precisas — respondemos com uma
            proposta à medida.
          </p>
          <GridWorksForm />
        </div>
      </section>
    </>
  );
}
