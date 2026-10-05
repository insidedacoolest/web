import Link from "next/link";
import { requireAdmin } from "../../lib/authGuard";
import { prisma } from "../../lib/db";
import { deleteProduct } from "./actions";

export const metadata = { title: "Loja — Painel Drift Factory" };

export default async function AdminLojaPage() {
  await requireAdmin();
  const products = await prisma.product.findMany({ orderBy: { id: "asc" } });

  return (
    <>
      <div className="admin-content-head">
        <div>
          <h1>Loja</h1>
          <p>{products.length} produto(s) disponíveis.</p>
        </div>
      </div>

      <div className="admin-toolbar">
        <Link href="/admin/loja/novo" className="btn btn-lime btn-sm">Novo produto</Link>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Produto</th><th>Categoria</th><th className="num">Preço</th><th></th></tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.catsCsv}</td>
                <td className="num">{p.price.toFixed(2)} €</td>
                <td>
                  <div className="admin-table-actions">
                    <Link href={`/admin/loja/${p.id}/editar`} className="admin-link-btn">Editar</Link>
                    <form action={deleteProduct.bind(null, p.id)}>
                      <button type="submit" className="admin-link-btn danger">Apagar</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr><td colSpan={4}>Ainda não há produtos.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
