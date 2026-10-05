import Link from "next/link";
import LegalDraftNotice from "../../components/LegalDraftNotice";
import LegalPlaceholder from "../../components/LegalPlaceholder";
import { LEGAL_INFO } from "../../lib/legalInfo";

export const metadata = {
  title: "Resolução de Litígios de Consumo — Drift Factory",
  description: "Entidade de Resolução Alternativa de Litígios de Consumo (RAL) competente para a Drift Factory.",
};

export default function ResolucaoLitigiosPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Início</Link> / Resolução de Litígios de Consumo</div>
          <span className="eyebrow">Legal</span>
          <h1 className="display h1">Resolução de Litígios de Consumo</h1>
        </div>
      </section>

      <section className="section">
        <div className="container legal-page">
          <LegalDraftNotice />
          <p className="legal-updated">Última atualização: 24 de agosto de 2026.</p>

          <h2>1. Resolução direta</h2>
          <p>
            Em caso de qualquer problema com uma encomenda, pedimos que nos contactes primeiro
            através de <LegalPlaceholder>{LEGAL_INFO.email}</LegalPlaceholder> — a grande
            maioria das situações resolve-se diretamente e mais rapidamente desta forma.
          </p>

          <h2>2. Entidade de Resolução Alternativa de Litígios (RAL)</h2>
          <p>
            Nos termos da Lei n.º 144/2015, caso não seja possível chegar a acordo diretamente
            connosco, o consumidor pode recorrer a uma entidade de Resolução Alternativa de
            Litígios de Consumo. A entidade competente para a Drift Factory é:
          </p>
          <a href="#" className="legal-badge-link">
            <LegalPlaceholder>{LEGAL_INFO.ralEntity}</LegalPlaceholder>
          </a>
          <p>
            Podes consultar a lista completa de entidades RAL reconhecidas em Portugal,
            organizadas por setor e área geográfica, no{" "}
            <a href="https://www.consumidor.gov.pt" target="_blank" rel="noopener noreferrer">Portal do Consumidor</a>.
          </p>

          <h2>3. Livro de Reclamações</h2>
          <p>
            Podes também recorrer ao nosso Livro de Reclamações Eletrónico — ver a página{" "}
            <Link href="/livro-reclamacoes">Livro de Reclamações</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
