import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "../../../lib/db";
import { productToView } from "../../../lib/transform";
import ProductGallery from "../../../components/ProductGallery";
import ProductDetailActions from "../../../components/ProductDetailActions";
import ProductCard from "../../../components/ProductCard";
import { getLocale } from "../../../lib/i18n";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const row = await prisma.product.findUnique({ where: { id: Number(id) } });
  if (!row) return { title: "Produto — Drift Factory" };
  return {
    title: `${row.name} — Loja Drift Factory`,
    description: row.description || `${row.name} na loja oficial Drift Factory.`,
  };
}

export default async function ProductPage({ params }) {
  const locale = await getLocale();
  const { id } = await params;
  const row = await prisma.product.findUnique({ where: { id: Number(id) } });
  if (!row) notFound();
  const product = productToView(row, locale);

  const otherRows = await prisma.product.findMany({
    where: { id: { not: product.id } },
    orderBy: { id: "asc" },
  });
  const others = otherRows.map((p) => productToView(p, locale));
  const mainCat = product.cats[0];
  const recommendations = others
    .sort((a, b) => (b.cats.includes(mainCat) ? 1 : 0) - (a.cats.includes(mainCat) ? 1 : 0))
    .slice(0, 4);

  return (
    <section className="section">
      <div className="container">
        <div className="breadcrumb"><Link href="/">Início</Link> / <Link href="/loja">Loja</Link> / {product.name}</div>

        <div className="product-detail">
          <ProductGallery product={product} />

          <div>
            <span className="eyebrow">{product.cats[0] || "Merch"}</span>
            <h1 className="display h2" style={{ marginTop: ".6rem" }}>{product.name}</h1>

            {product.description && <p className="lede" style={{ margin: "1rem 0 1.6rem" }}>{product.description}</p>}

            <ProductDetailActions product={product} />

            <div className="stock-status">
              <span className={`stock-dot${product.inStock ? "" : " out"}`} />
              {product.inStock ? "Em stock, pronto a enviar" : "Esgotado — volta em breve"}
            </div>
          </div>
        </div>

        {recommendations.length > 0 && (
          <div className="product-recommendations">
            <h2 className="h3" style={{ fontFamily: "var(--font-head)", textTransform: "uppercase", marginBottom: "1.4rem" }}>
              Recomendações
            </h2>
            <div className="grid grid-4">
              {recommendations.map((p) => (
                <ProductCard product={p} key={p.id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
