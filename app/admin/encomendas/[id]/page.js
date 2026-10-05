import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "../../../lib/authGuard";
import { prisma } from "../../../lib/db";
import { updateOrderStatus, deleteOrder } from "../actions";

export const metadata = { title: "Encomenda — Painel Drift Factory" };

export default async function AdminEncomendaPage({ params }) {
  await requireAdmin();
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id: Number(id) },
    include: { items: true },
  });
  if (!order) notFound();

  const updateWithId = updateOrderStatus.bind(null, order.id);
  const deleteWithId = deleteOrder.bind(null, order.id);

  return (
    <>
      <div className="admin-content-head">
        <div>
          <h1>Encomenda #{order.id}</h1>
          <p><Link href="/admin/encomendas">← Voltar às encomendas</Link></p>
        </div>
      </div>

      <div className="grid grid-2">
        <div className="info-panel">
          <h3 className="info-panel-title">Cliente</h3>
          <dl className="info-list">
            <div><dt>Nome</dt><dd>{order.name}</dd></div>
            <div><dt>Email</dt><dd>{order.email}</dd></div>
            <div><dt>Telefone</dt><dd>{order.phone}</dd></div>
            <div><dt>Morada</dt><dd>{order.address}</dd></div>
            <div><dt>Data</dt><dd>{new Date(order.createdAt).toLocaleString("pt-PT")}</dd></div>
          </dl>
          {order.notes && (
            <>
              <h3 className="info-panel-title" style={{ marginTop: "1.2rem" }}>Notas</h3>
              <p className="lede" style={{ margin: 0 }}>{order.notes}</p>
            </>
          )}
        </div>

        <div className="info-panel">
          <h3 className="info-panel-title">Estado</h3>
          <form action={updateWithId} className="admin-form">
            <label className="admin-field">
              <span>Estado da encomenda</span>
              <select name="status" defaultValue={order.status}>
                <option value="pendente">Pendente</option>
                <option value="confirmada">Confirmada</option>
                <option value="enviada">Enviada</option>
                <option value="cancelada">Cancelada</option>
              </select>
            </label>
            <div className="admin-form-actions">
              <button type="submit" className="btn btn-lime btn-sm">Guardar estado</button>
            </div>
          </form>
        </div>
      </div>

      <div className="admin-subsection">
        <h3 className="info-panel-title">Itens</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Produto</th><th>Tamanho</th><th className="num">Qtd</th><th className="num">Preço</th><th className="num">Subtotal</th></tr>
            </thead>
            <tbody>
              {order.items.map((it) => (
                <tr key={it.id}>
                  <td>{it.productName}</td>
                  <td>{it.size || "—"}</td>
                  <td className="num">{it.qty}</td>
                  <td className="num">{it.price.toFixed(2)} €</td>
                  <td className="num">{(it.price * it.qty).toFixed(2)} €</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr><td colSpan={4} className="num"><strong>Total</strong></td><td className="num"><strong>{order.total.toFixed(2)} €</strong></td></tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="admin-subsection">
        <h3 className="info-panel-title">Zona de perigo</h3>
        <form action={deleteWithId}>
          <button type="submit" className="admin-link-btn danger">Apagar esta encomenda</button>
        </form>
      </div>
    </>
  );
}
