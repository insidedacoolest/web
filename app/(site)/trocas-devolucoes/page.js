import Link from "next/link";
import LegalDraftNotice from "../../components/LegalDraftNotice";
import LegalPlaceholder from "../../components/LegalPlaceholder";
import { LEGAL_INFO } from "../../lib/legalInfo";

export const metadata = {
  title: "Trocas e Devoluções — Drift Factory",
  description: "Direito de livre resolução, condições de troca e devolução de produtos da loja Drift Factory.",
};

export default function TrocasDevolucoesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Início</Link> / Trocas e Devoluções</div>
          <span className="eyebrow">Legal</span>
          <h1 className="display h1">Trocas e Devoluções</h1>
        </div>
      </section>

      <section className="section">
        <div className="container legal-page">
          <LegalDraftNotice />
          <p className="legal-updated">Última atualização: 24 de agosto de 2026.</p>

          <h2>1. Direito de livre resolução</h2>
          <p>
            Nos termos do Decreto-Lei n.º 24/2014, tens direito a resolver livremente o contrato
            de compra, sem necessidade de indicar qualquer motivo, no prazo de <strong>14 dias
            de calendário</strong> a contar da data em que recebes o(s) produto(s).
          </p>

          <h2>2. Como exercer o direito de livre resolução</h2>
          <p>
            Para exercer este direito, contacta-nos através de{" "}
            <LegalPlaceholder>{LEGAL_INFO.email}</LegalPlaceholder>, indicando o número da
            encomenda e a tua intenção de devolver o(s) produto(s). Não é necessário usar um
            formulário específico — basta uma declaração inequívoca da tua decisão.
          </p>

          <h2>3. Prazo e forma de devolução do produto</h2>
          <p>
            Após comunicares a tua decisão, tens até 14 dias de calendário para nos devolver o
            produto. Os custos de envio da devolução são da tua responsabilidade, salvo indicação
            em contrário no momento da compra.
          </p>

          <h2>4. Estado do produto</h2>
          <p>
            O produto deve ser devolvido nas condições em que foi recebido: sem sinais de uso,
            com embalagem e etiquetas originais. A Drift Factory reserva-se o direito de recusar
            a devolução ou de reduzir o valor reembolsado caso o produto apresente sinais de uso
            além do necessário para verificar a sua natureza e características.
          </p>

          <h2>5. Reembolso</h2>
          <p>
            Após receber e verificar o produto devolvido, procedemos ao reembolso no prazo
            máximo de 14 dias, através do mesmo meio de pagamento utilizado na compra (ou outro
            meio acordado contigo). O reembolso inclui o valor pago pelo produto; os custos de
            envio originais só são reembolsados nos termos legalmente exigidos.
          </p>

          <h2>6. Exceções ao direito de livre resolução</h2>
          <p>Nos termos da lei, o direito de livre resolução não se aplica, nomeadamente, a:</p>
          <ul>
            <li>Produtos personalizados ou feitos por medida a pedido do cliente;</li>
            <li>Produtos selados que não sejam suscetíveis de devolução por motivos de proteção da saúde ou de higiene, caso tenham sido abertos após a entrega;</li>
            <li>Produtos que, pela sua natureza, sejam inseparavelmente misturados com outros artigos após a entrega.</li>
          </ul>

          <h2>7. Produtos com defeito — garantia legal</h2>
          <p>
            Independentemente do direito de livre resolução, todos os produtos beneficiam da
            garantia legal de conformidade prevista no Decreto-Lei n.º 84/2021 (3 anos para bens
            móveis a contar da data de entrega). Se receberes um produto com defeito, contacta-nos
            através de <LegalPlaceholder>{LEGAL_INFO.email}</LegalPlaceholder> para
            organizarmos a reparação, substituição, redução do preço ou resolução do contrato,
            conforme aplicável.
          </p>

          <h2>8. Dúvidas</h2>
          <p>
            Para qualquer dúvida sobre trocas ou devoluções, contacta-nos através de{" "}
            <LegalPlaceholder>{LEGAL_INFO.email}</LegalPlaceholder>. Consulta também a página{" "}
            <Link href="/resolucao-litigios">Resolução de Litígios de Consumo</Link> caso não
            fiquemos a entendimento.
          </p>
        </div>
      </section>
    </>
  );
}
