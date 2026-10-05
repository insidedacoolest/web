import Link from "next/link";
import LegalDraftNotice from "../../components/LegalDraftNotice";
import LegalPlaceholder from "../../components/LegalPlaceholder";
import { LEGAL_INFO } from "../../lib/legalInfo";

export const metadata = {
  title: "Política de Privacidade — Drift Factory",
  description: "Como a Drift Factory recolhe, usa e protege os dados pessoais dos utilizadores.",
};

export default function PoliticaPrivacidadePage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Início</Link> / Política de Privacidade</div>
          <span className="eyebrow">Legal</span>
          <h1 className="display h1">Política de Privacidade</h1>
        </div>
      </section>

      <section className="section">
        <div className="container legal-page">
          <LegalDraftNotice />
          <p className="legal-updated">Última atualização: 24 de agosto de 2026.</p>

          <h2>1. Responsável pelo tratamento</h2>
          <p>
            O responsável pelo tratamento dos dados pessoais recolhidos através deste site é{" "}
            <LegalPlaceholder>{LEGAL_INFO.entityName}</LegalPlaceholder>, NIF{" "}
            <LegalPlaceholder>{LEGAL_INFO.nif}</LegalPlaceholder>, contactável através de{" "}
            <LegalPlaceholder>{LEGAL_INFO.email}</LegalPlaceholder>.
          </p>

          <h2>2. Que dados recolhemos</h2>
          <ul>
            <li><strong>Encomendas na loja:</strong> nome, email, telefone, morada de entrega e notas que indiques no checkout.</li>
            <li><strong>Newsletter:</strong> endereço de email, se subscreveres voluntariamente.</li>
            <li><strong>Navegação:</strong> não usamos cookies de rastreio ou análise de terceiros. O único cookie utilizado é técnico, para manter a sessão de administração do site, e não é aplicado a visitantes comuns.</li>
          </ul>
          <p>Não recolhemos nem armazenamos dados de pagamento — o pagamento das encomendas é combinado diretamente com o cliente, fora do site.</p>

          <h2>3. Finalidades e base legal</h2>
          <ul>
            <li>Processar e entregar encomendas da loja — <em>execução de contrato</em>.</li>
            <li>Responder a contactos e questões — <em>interesse legítimo</em>.</li>
            <li>Enviar a newsletter — <em>consentimento</em>, revogável a qualquer momento.</li>
          </ul>

          <h2>4. Prazo de conservação</h2>
          <p>
            Os dados de encomendas são conservados pelo período exigido pela legislação fiscal e
            comercial aplicável. Os emails de newsletter são conservados até o titular solicitar
            a remoção ou cancelar a subscrição.
          </p>

          <h2>5. Partilha de dados</h2>
          <p>
            Os dados não são vendidos nem partilhados com terceiros para fins de marketing. Podem
            ser acedidos por prestadores de serviços técnicos estritamente necessários ao
            funcionamento do site (ex.: alojamento web), sujeitos a obrigações de
            confidencialidade.
          </p>

          <h2>6. Direitos do titular dos dados</h2>
          <p>Nos termos do RGPD, tens direito a:</p>
          <ul>
            <li>Aceder aos teus dados pessoais;</li>
            <li>Solicitar a retificação de dados incorretos;</li>
            <li>Solicitar o apagamento dos teus dados (&quot;direito ao esquecimento&quot;);</li>
            <li>Opor-te ao tratamento ou solicitar a sua limitação;</li>
            <li>Solicitar a portabilidade dos dados;</li>
            <li>
              Apresentar reclamação junto da Comissão Nacional de Proteção de Dados (CNPD) —{" "}
              <a href="https://www.cnpd.pt" target="_blank" rel="noopener noreferrer">www.cnpd.pt</a>.
            </li>
          </ul>
          <p>Para exercer qualquer um destes direitos, contacta-nos através de <LegalPlaceholder>{LEGAL_INFO.email}</LegalPlaceholder>.</p>

          <h2>7. Segurança</h2>
          <p>
            Adotamos medidas técnicas e organizativas adequadas para proteger os dados pessoais
            contra acesso não autorizado, perda ou divulgação indevida.
          </p>

          <h2>8. Alterações a esta política</h2>
          <p>
            Esta Política de Privacidade pode ser atualizada periodicamente. A versão em vigor é
            sempre a publicada nesta página.
          </p>
        </div>
      </section>
    </>
  );
}
