import Link from "next/link";
import IconGlyph from "./IconGlyph";
import { PRODUCT_ICONS } from "../lib/icons";

export default function ProductCard({ product }) {
  return (
    <Link href={`/loja/${product.id}`} className="product-card product-card-link">
      <div className={`product-media ${product.grad}`}>
        {!product.inStock && <span className="badge pink product-badge-stock">Esgotado</span>}
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} />
        ) : (
          <IconGlyph recipe={PRODUCT_ICONS[product.icon] || PRODUCT_ICONS.shirt} color={product.colorVar} />
        )}
      </div>
      <div className="product-body">
        <span className="product-name">{product.name}</span>
        <span className="product-price">
          {product.oldPrice ? <span className="product-old">{product.oldPrice.toFixed(2)} €</span> : null}
          {product.oldPrice ? " " : ""}{product.price.toFixed(2)} €
        </span>
        <span className="product-cta">Ver detalhes →</span>
      </div>
    </Link>
  );
}
