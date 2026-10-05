import Link from "next/link";
import { requireAdmin } from "../../../lib/authGuard";
import ProductForm from "../ProductForm";
import { createProduct } from "../actions";

export const metadata = { title: "Novo produto — Painel Drift Factory" };

export default async function NovoProdutoPage() {
  await requireAdmin();
  return (
    <>
      <div className="admin-content-head">
        <div>
          <h1>Novo produto</h1>
          <p><Link href="/admin/loja">← Voltar à loja</Link></p>
        </div>
      </div>
      <ProductForm action={createProduct} submitLabel="Criar produto" />
    </>
  );
}
