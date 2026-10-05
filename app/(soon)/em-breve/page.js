import NewsletterForm from "../../components/NewsletterForm";

export default function EmBrevePage() {
  return (
    <main className="soon-shell">
      <img src="/img/em-breve-bg.jpg" alt="" className="soon-bg" aria-hidden="true" />
      <div className="soon-glow soon-glow-lime" aria-hidden="true" />
      <div className="soon-glow soon-glow-pink" aria-hidden="true" />

      <div className="soon-content">
        <div className="soon-mark">
          <img src="/img/logo-df.png" alt="Drift Factory" width={140} />
        </div>

        <span className="eyebrow" style={{ justifyContent: "center" }}>Portugal · Europa · Drift</span>
        <h1 className="display h1" style={{ marginTop: "1rem" }}>
          Chegamos <span className="text-gradient">em breve</span>.
        </h1>
        <p className="lede" style={{ margin: "1.2rem auto 0", maxWidth: "48ch" }}>
          Notícias, campeonatos, pilotos e resultados do drift em Portugal e no
          resto da Europa — a fábrica está a aquecer motores. Volta em breve.
        </p>

        <div className="hero-actions" style={{ justifyContent: "center", marginTop: "2rem" }}>
          <a className="btn btn-lime" href="https://www.instagram.com/_driftfactory" target="_blank" rel="noopener noreferrer">
            Segue-nos no Instagram
          </a>
        </div>

        <div className="soon-newsletter">
          <span className="eyebrow pink" style={{ justifyContent: "center" }}>Newsletter</span>
          <p className="lede" style={{ margin: ".6rem auto 1rem", maxWidth: "40ch" }}>
            Deixa o teu email e avisamos-te assim que o site abrir.
          </p>
          <NewsletterForm center />
        </div>
      </div>
    </main>
  );
}
