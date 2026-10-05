import Link from "next/link";
import FilterGroup from "../../components/FilterGroup";
import ProductCard from "../../components/ProductCard";
import { prisma } from "../../lib/db";
import { productToView } from "../../lib/transform";
import { getLocale } from "../../lib/i18n";

export const metadata = {
  title: "Loja — Drift Factory",
  description: "Merchandise oficial Drift Factory — t-shirts, bonés, autocolantes e mais.",
};

const PILLS = [
  { value: "all", label: "Tudo" },
  { value: "vestuario", label: "Vestuário" },
  { value: "acessorios", label: "Acessórios" },
  { value: "colecionaveis", label: "Colecionáveis" },
  { value: "publicidade", label: "Publicidade" },
];

export default async function LojaPage() {
  const locale = await getLocale();
  const rows = await prisma.product.findMany({ orderBy: { id: "asc" } });
  const products = rows.map((p) => productToView(p, locale));

  const items = products.map((p) => ({
    key: p.id,
    cats: p.cats,
    content: <ProductCard product={p} />,
  }));

  return (
    <>
      <section className="page-hero">
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div className="breadcrumb"><Link href="/">Início</Link> / Loja</div>
            <span className="eyebrow">Merch</span>
            <h1 className="display h1">Loja</h1>
            <p className="lede" style={{ marginTop: ".8rem" }}>
              Escolhe um produto para ver detalhes, tamanhos e adicionar ao carrinho.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {products.length === 0 ? (
            <p className="lede">Ainda não há produtos na loja.</p>
          ) : (
            <FilterGroup pills={PILLS} items={items} gridClass="grid grid-4" />
          )}
        </div>
      </section>
    </>
  );
}
