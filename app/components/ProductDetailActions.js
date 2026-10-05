"use client";

import { useState } from "react";
import AddToCartButton from "./AddToCartButton";

export default function ProductDetailActions({ product }) {
  const hasVariants = product.variants && product.variants.length > 0;
  const [variant, setVariant] = useState(hasVariants ? product.variants[0] : null);
  const [size, setSize] = useState(!hasVariants ? product.sizes?.[0] || null : null);
  const [qty, setQty] = useState(1);

  const price = hasVariants ? variant.price : product.price;
  const label = hasVariants ? variant.label : size;

  return (
    <>
      <div className="product-detail-price">
        {!hasVariants && product.oldPrice && <span className="product-old">{product.oldPrice.toFixed(2)} €</span>}
        <span className="product-price">{price.toFixed(2)} €</span>
      </div>

      {hasVariants ? (
        <div className="admin-field" style={{ marginBottom: "1.4rem" }}>
          <span className="size-label">Opções</span>
          <div className="size-selector">
            {product.variants.map((v) => (
              <button
                key={v.label}
                type="button"
                className={`size-option${variant.label === v.label ? " active" : ""}`}
                onClick={() => setVariant(v)}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        product.sizes && product.sizes.length > 0 && (
          <div className="admin-field" style={{ marginBottom: "1.4rem" }}>
            <span className="size-label">Tamanho</span>
            <div className="size-selector">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`size-option${size === s ? " active" : ""}`}
                  onClick={() => setSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )
      )}

      <div className="qty-row">
        <span className="size-label">Quantidade</span>
        <div className="qty-stepper">
          <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Diminuir quantidade">−</button>
          <span>{qty}</span>
          <button type="button" onClick={() => setQty((q) => q + 1)} aria-label="Aumentar quantidade">+</button>
        </div>
      </div>

      <AddToCartButton
        id={product.id}
        name={product.name}
        price={price}
        size={label}
        qty={qty}
        disabled={!product.inStock}
        className="btn-block"
      />
    </>
  );
}
