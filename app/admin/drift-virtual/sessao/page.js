import Link from "next/link";
import { requireAdmin } from "../../../lib/authGuard";
import { prisma } from "../../../lib/db";
import SessionForm from "./SessionForm";
import { saveSession } from "./actions";

export const metadata = { title: "Próxima sessão — Painel Drift Factory" };

export default async function AdminSessaoPage() {
  await requireAdmin();
  const session = await prisma.virtualSession.findFirst();

  return (
    <>
      <div className="admin-content-head">
        <div>
          <h1>Próxima sessão</h1>
          <p><Link href="/admin/drift-virtual">← Voltar ao Drift Virtual</Link></p>
        </div>
      </div>
      <SessionForm action={saveSession} initial={session} />
    </>
  );
}
