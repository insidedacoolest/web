import Link from "next/link";
import { requireAdmin } from "../../../lib/authGuard";
import ChampionshipForm from "../ChampionshipForm";
import { createChampionship } from "../actions";

export const metadata = { title: "Novo campeonato — Painel Drift Factory" };

export default async function NovoCampeonatoPage() {
  await requireAdmin();
  return (
    <>
      <div className="admin-content-head">
        <div>
          <h1>Novo campeonato</h1>
          <p><Link href="/admin/campeonatos">← Voltar aos campeonatos</Link></p>
        </div>
      </div>
      <ChampionshipForm action={createChampionship} submitLabel="Criar campeonato" />
    </>
  );
}
