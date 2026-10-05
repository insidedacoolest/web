import Link from "next/link";

export const metadata = {
  title: "Livro de Reclamações — Drift Factory",
  description: "Acesso ao Livro de Reclamações Eletrónico da Drift Factory.",
};

export default function LivroReclamacoesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Início</Link> / Livro de Reclamações</div>
          <span className="eyebrow">Legal</span>
          <h1 className="display h1">Livro de Reclamações</h1>
        </div>
      </section>

      <section className="section">
        <div className="container legal-page">
          <p>
            Nos termos do Decreto-Lei n.º 156/2005, este site dispõe de Livro de Reclamações
            Eletrónico. Se não ficares satisfeito com a nossa resposta a uma reclamação, tens o
            direito de solicitar o livro de reclamações através do link abaixo.
          </p>

          <a
            href="https://www.livroreclamacoes.pt"
            target="_blank"
            rel="noopener noreferrer"
            className="legal-badge-link"
          >
            📋 Pedir Livro de Reclamações em livroreclamacoes.pt
          </a>

          <p>
            Antes de recorreres ao livro de reclamações, terás oportunidade de contactar-nos
            diretamente para tentarmos resolver a situação — ver a página{" "}
            <Link href="/trocas-devolucoes">Trocas e Devoluções</Link> ou{" "}
            <Link href="/resolucao-litigios">Resolução de Litígios de Consumo</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
