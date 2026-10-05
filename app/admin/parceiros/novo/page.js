import Link from "next/link";
import { requireAdmin } from "../../../lib/authGuard";
import PartnerForm from "../PartnerForm";
import { createPartner } from "../actions";

export const metadata = { title: "Novo parceiro — Painel Drift Factory" };

export default async function NovoParceiroPage() {
  await requireAdmin();
  return (
    <>
      <div className="admin-content-head">
        <div>
          <h1>Novo parceiro</h1>
          <p><Link href="/admin/parceiros">← Voltar aos parceiros</Link></p>
        </div>
      </div>
      <PartnerForm action={createPartner} submitLabel="Criar parceiro" requireLogo />
    </>
  );
}
