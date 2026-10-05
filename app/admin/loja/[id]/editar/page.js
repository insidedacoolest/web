import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "../../../../lib/authGuard";
import { prisma } from "../../../../lib/db";
import ProductForm from "../../ProductForm";
import { updateProduct, deleteProduct } from "../../actions";

export const metadata = { title: "Editar produto — Painel Drift Factory" };

export default async function EditarProdutoPage({ params }) {
  await requireAdmin();
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id: Number(id) } });
  if (!product) notFound();

  const updateWithId = updateProduct.bind(null, product.id);
  const deleteWithId = deleteProduct.bind(null, product.id);

  return (
    <>
      <div className="admin-content-head">
        <div>
          <h1>Editar produto</h1>
          <p><Link href="/admin/loja">← Voltar à loja</Link></p>
        </div>
      </div>
      <ProductForm action={updateWithId} initial={product} submitLabel="Guardar alterações" />

      <div className="admin-subsection">
        <h3 className="info-panel-title">Zona de perigo</h3>
        <form action={deleteWithId}>
          <button type="submit" className="admin-link-btn danger">Apagar este produto</button>
        </form>
      </div>
    </>
  );
}
