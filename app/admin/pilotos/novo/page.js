import Link from "next/link";
import { requireAdmin } from "../../../lib/authGuard";
import DriverForm from "../DriverForm";
import { createDriver } from "../actions";

export const metadata = { title: "Novo piloto — Painel Drift Factory" };

export default async function NovoPilotoPage() {
  await requireAdmin();
  return (
    <>
      <div className="admin-content-head">
        <div>
          <h1>Novo piloto</h1>
          <p><Link href="/admin/pilotos">← Voltar aos pilotos</Link></p>
        </div>
      </div>
      <DriverForm action={createDriver} submitLabel="Criar piloto" />
    </>
  );
}
