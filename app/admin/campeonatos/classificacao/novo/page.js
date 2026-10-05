import Link from "next/link";
import { requireAdmin } from "../../../../lib/authGuard";
import StandingForm from "../../StandingForm";
import { createStanding } from "../../actions";

export const metadata = { title: "Nova entrada — Painel Drift Factory" };

export default async function NovaClassificacaoPage() {
  await requireAdmin();
  return (
    <>
      <div className="admin-content-head">
        <div>
          <h1>Nova entrada na classificação</h1>
          <p><Link href="/admin/campeonatos">← Voltar aos campeonatos</Link></p>
        </div>
      </div>
      <StandingForm action={createStanding} submitLabel="Criar entrada" />
    </>
  );
}
