import Image from "next/image";
import Link from "next/link";
import NewsletterForm from "./NewsletterForm";
import { DICT } from "../lib/dict";

export default function Footer({ locale = "pt" }) {
  const nav = DICT.nav[locale] || DICT.nav.pt;
  const f = DICT.footer[locale] || DICT.footer.pt;

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Image src="/img/logo-df-full.png" alt="Drift Factory" width={1200} height={239} className="footer-brand-logo" />
          <p>{f.tagline}</p>
          <div className="footer-social">
            <a href="https://www.instagram.com/_driftfactory" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.85.07 3.25.15 4.77 1.7 4.92 4.92.06 1.25.07 1.62.07 4.81s-.01 3.56-.07 4.81c-.15 3.2-1.66 4.77-4.92 4.92-1.25.06-1.62.07-4.85.07-3.2 0-3.6-.01-4.85-.07-3.26-.15-4.77-1.72-4.92-4.92-.06-1.25-.07-1.61-.07-4.81s.02-3.56.07-4.81c.15-3.22 1.66-4.77 4.92-4.92C8.4 2.2 8.8 2.2 12 2.2zm0 2.16c-3.14 0-3.51.01-4.75.07-2.34.1-3.29 1.07-3.4 3.4-.06 1.24-.07 1.61-.07 4.75s.01 3.51.07 4.75c.11 2.32 1.06 3.29 3.4 3.4 1.24.06 1.6.07 4.75.07s3.51-.01 4.75-.07c2.33-.11 3.29-1.07 3.4-3.4.06-1.24.07-1.6.07-4.75s-.01-3.51-.07-4.75c-.11-2.32-1.06-3.29-3.4-3.4-1.24-.06-1.61-.07-4.75-.07zm0 3.68a5.96 5.96 0 110 11.92 5.96 5.96 0 010-11.92zm0 2.16a3.8 3.8 0 100 7.6 3.8 3.8 0 000-7.6zm6.2-2.4a1.4 1.4 0 11-2.8 0 1.4 1.4 0 012.8 0z" /></svg>
            </a>
          </div>
        </div>

        <nav className="footer-col" aria-label={f.explore}>
          <h4>{f.explore}</h4>
          <Link href="/noticias">{nav.noticias}</Link>
          <Link href="/campeonatos">{nav.campeonatos}</Link>
          <Link href="/pilotos">{nav.pilotos}</Link>
          <Link href="/resultados">{nav.resultados}</Link>
        </nav>

        <nav className="footer-col" aria-label={f.more}>
          <h4>{f.more}</h4>
          <Link href="/calendario">{nav.calendario}</Link>
          <Link href="/drift-virtual">{nav.virtual}</Link>
          <Link href="/drift-virtual/regulamento">{f.regulation}</Link>
          <Link href="/loja">{nav.loja}</Link>
        </nav>

        <nav className="footer-col" aria-label={f.legal}>
          <h4>{f.legal}</h4>
          <Link href="/termos-condicoes">{f.terms}</Link>
          <Link href="/politica-privacidade">{f.privacy}</Link>
          <Link href="/trocas-devolucoes">{f.returns}</Link>
          <Link href="/livro-reclamacoes">{f.complaints}</Link>
          <Link href="/resolucao-litigios">{f.disputes}</Link>
        </nav>

        <div className="footer-col footer-newsletter">
          <h4>{f.newsletter}</h4>
          <p>{f.newsletterLede}</p>
          <NewsletterForm />
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Drift Factory. {f.rights}</span>
        <a href="https://www.livroreclamacoes.pt" target="_blank" rel="noopener noreferrer">{f.complaintsBook}</a>
        <span>{f.demo}</span>
      </div>
    </footer>
  );
}
