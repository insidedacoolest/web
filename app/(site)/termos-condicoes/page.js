import Link from "next/link";
import LegalDraftNotice from "../../components/LegalDraftNotice";
import LegalPlaceholder from "../../components/LegalPlaceholder";
import { LEGAL_INFO } from "../../lib/legalInfo";

export const metadata = {
  title: "Termos e Condições — Drift Factory",
  description: "Termos e condições de utilização do site e da loja online Drift Factory.",
};

export default function TermosCondicoesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Início</Link> / Termos e Condições</div>
          <span className="eyebrow">Legal</span>
          <h1 className="display h1">Termos e Condições</h1>
        </div>
      </section>

      <section className="section">
        <div className="container legal-page">
          <LegalDraftNotice />
          <p className="legal-updated">Última atualização: 24 de agosto de 2026.</p>

          <h2>1. Identificação</h2>
          <p>
            O presente site é operado por <LegalPlaceholder>{LEGAL_INFO.entityName}</LegalPlaceholder>,
            NIF <LegalPlaceholder>{LEGAL_INFO.nif}</LegalPlaceholder>, com morada em{" "}
            <LegalPlaceholder>{LEGAL_INFO.address}</LegalPlaceholder>, doravante designada
            &quot;Drift Factory&quot;. Contacto: <LegalPlaceholder>{LEGAL_INFO.email}</LegalPlaceholder>.
          </p>

          <h2>2. Objeto e âmbito</h2>
          <p>
            Estes Termos e Condições regulam o acesso e utilização do site driftfactory.pt,
            incluindo a consulta de conteúdos informativos (notícias, campeonatos, pilotos,
            resultados, calendário) e a compra de produtos através da loja online. Ao aceder
            ou utilizar o site, o utilizador aceita estes termos na íntegra.
          </p>

          <h2>3. Conteúdo informativo</h2>
          <p>
            As notícias, resultados, classificações e demais conteúdos publicados têm caráter
            informativo. A Drift Factory procura assegurar a exatidão da informação, mas não
            garante a ausência de erros ou omissões, nem se responsabiliza por decisões tomadas
            com base nesse conteúdo. Recomenda-se a confirmação de datas e resultados junto das
            organizações oficiais de cada campeonato.
          </p>

          <h2>4. Loja online — condições de compra</h2>
          <h3>4.1 Produtos e preços</h3>
          <p>
            Os produtos apresentados na loja incluem descrição, imagem, preço e, quando
            aplicável, tamanhos disponíveis. Os preços são apresentados em euros (€) e podem
            ser alterados sem aviso prévio, não afetando encomendas já confirmadas.
            A disponibilidade de stock é indicada em cada produto e pode variar.
          </p>
          <h3>4.2 Processo de encomenda</h3>
          <p>
            A encomenda é efetuada através do carrinho de compras e do formulário de checkout,
            onde o cliente indica nome, contacto, morada de entrega e, opcionalmente, notas
            adicionais. Após a submissão, a Drift Factory contacta o cliente para confirmar a
            encomenda e combinar o método de pagamento e envio.
          </p>
          <h3>4.3 Pagamento</h3>
          <p>
            O pagamento não é processado automaticamente no site — é combinado diretamente com
            o cliente após a confirmação da encomenda (ex.: transferência bancária, MB WAY, ou
            outro meio acordado). Nenhum dado de pagamento é recolhido ou armazenado pelo site.
          </p>
          <h3>4.4 Entrega</h3>
          <p>
            Os prazos e custos de envio são comunicados ao cliente aquando da confirmação da
            encomenda, podendo variar consoante a morada de entrega e o volume/peso da
            encomenda.
          </p>

          <h2>5. Propriedade intelectual</h2>
          <p>
            O conteúdo original do site (textos, layout, logótipo, gráficos) é propriedade da
            Drift Factory ou das respetivas entidades licenciadoras (ex.: fotografias de
            pilotos usadas com autorização) e não pode ser reproduzido sem consentimento prévio.
          </p>

          <h2>6. Limitação de responsabilidade</h2>
          <p>
            A Drift Factory não se responsabiliza por indisponibilidades técnicas temporárias
            do site, nem por danos indiretos resultantes da sua utilização, salvo nos casos em
            que a lei imponha responsabilidade que não possa ser excluída.
          </p>

          <h2>7. Lei aplicável e foro</h2>
          <p>
            Estes Termos regem-se pela lei portuguesa. Para a resolução de qualquer litígio
            emergente do presente contrato, é competente o tribunal da comarca da residência do
            consumidor, sem prejuízo do recurso a uma entidade de Resolução Alternativa de
            Litígios de Consumo — ver a página{" "}
            <Link href="/resolucao-litigios">Resolução de Litígios de Consumo</Link>.
          </p>

          <h2>8. Alterações aos termos</h2>
          <p>
            A Drift Factory pode atualizar estes Termos e Condições a qualquer momento,
            publicando a versão revista nesta página com a respetiva data de atualização.
          </p>
        </div>
      </section>
    </>
  );
}
