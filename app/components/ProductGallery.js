"use client";

import { useState } from "react";
import IconGlyph from "./IconGlyph";
import ImageLightbox from "./ImageLightbox";
import { PRODUCT_ICONS } from "../lib/icons";

export default function ProductGallery({ product }) {
  const images = product.images || [];
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <div>
      <div className={`product-detail-media ${product.grad}`}>
        {images.length > 0 ? (
          <img
            src={images[active]}
            alt={product.name}
            className="zoomable"
            onClick={() => setLightboxOpen(true)}
          />
        ) : (
          <IconGlyph recipe={PRODUCT_ICONS[product.icon] || PRODUCT_ICONS.shirt} color={product.colorVar} />
        )}
      </div>

      {images.length > 1 && (
        <div className="product-thumbs">
          {images.map((url, i) => (
            <button
              key={url}
              type="button"
              className={`product-thumb${i === active ? " active" : ""}`}
              onClick={() => setActive(i)}
              aria-label={`Foto ${i + 1}`}
            >
              <img src={url} alt="" />
            </button>
          ))}
        </div>
      )}

      {lightboxOpen && images.length > 0 && (
        <ImageLightbox
          images={images}
          active={active}
          onSelect={setActive}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}
