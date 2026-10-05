import Link from "next/link";
import { requireAdmin } from "../../../lib/authGuard";
import RoundForm from "../RoundForm";
import { createRound } from "../actions";

export const metadata = { title: "Nova tabela — Painel Drift Factory" };

export default async function NovaRondaPage() {
  await requireAdmin();
  return (
    <>
      <div className="admin-content-head">
        <div>
          <h1>Nova tabela de resultados</h1>
          <p><Link href="/admin/resultados">← Voltar aos resultados</Link></p>
        </div>
      </div>
      <RoundForm action={createRound} submitLabel="Criar tabela" />
    </>
  );
}
