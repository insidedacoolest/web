import Link from "next/link";
import { requireAdmin } from "../../lib/authGuard";
import { prisma } from "../../lib/db";

export const metadata = { title: "Encomendas — Painel Drift Factory" };

const STATUS_LABEL = {
  pendente: "Pendente",
  confirmada: "Confirmada",
  enviada: "Enviada",
  cancelada: "Cancelada",
};

export default async function AdminEncomendasPage() {
  await requireAdmin();
  const orders = await prisma.order.findMany({
    include: { _count: { select: { items: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <div className="admin-content-head">
        <div>
          <h1>Encomendas</h1>
          <p>{orders.length} encomenda(s) recebidas pela loja.</p>
        </div>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Data</th><th>Cliente</th><th>Itens</th><th className="num">Total</th><th>Estado</th><th></th></tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>{new Date(o.createdAt).toLocaleDateString("pt-PT")}</td>
                <td>{o.name}<br /><span className="admin-hint">{o.email}</span></td>
                <td>{o._count.items}</td>
                <td className="num">{o.total.toFixed(2)} €</td>
                <td>{STATUS_LABEL[o.status] || o.status}</td>
                <td>
                  <Link href={`/admin/encomendas/${o.id}`} className="admin-link-btn">Ver</Link>
                </td>
              </tr>
            ))}
            {orders.length === 0 && <tr><td colSpan={6}>Ainda não há encomendas.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
