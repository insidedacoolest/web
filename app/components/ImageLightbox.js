"use client";

import { useEffect, useRef, useState } from "react";

export default function ImageLightbox({ images, active, onSelect, onClose }) {
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const dragRef = useRef(null);

  useEffect(() => {
    setScale(1);
    setPos({ x: 0, y: 0 });
  }, [active]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && images.length > 1) onSelect((active + 1) % images.length);
      if (e.key === "ArrowLeft" && images.length > 1) onSelect((active - 1 + images.length) % images.length);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, onSelect, active, images.length]);

  function handleWheel(e) {
    e.preventDefault();
    setScale((s) => Math.min(4, Math.max(1, s - e.deltaY * 0.0015)));
  }

  function toggleZoom() {
    if (scale > 1) {
      setScale(1);
      setPos({ x: 0, y: 0 });
    } else {
      setScale(2.5);
    }
  }

  function handleMouseDown(e) {
    if (scale <= 1) return;
    dragRef.current = { startX: e.clientX - pos.x, startY: e.clientY - pos.y };
  }
  function handleMouseMove(e) {
    if (!dragRef.current) return;
    setPos({ x: e.clientX - dragRef.current.startX, y: e.clientY - dragRef.current.startY });
  }
  function stopDrag() {
    dragRef.current = null;
  }

  return (
    <div className="lightbox-backdrop" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose} aria-label="Fechar">✕</button>

      {images.length > 1 && (
        <>
          <button
            className="lightbox-nav lightbox-prev"
            aria-label="Foto anterior"
            onClick={(e) => { e.stopPropagation(); onSelect((active - 1 + images.length) % images.length); }}
          >
            ‹
          </button>
          <button
            className="lightbox-nav lightbox-next"
            aria-label="Foto seguinte"
            onClick={(e) => { e.stopPropagation(); onSelect((active + 1) % images.length); }}
          >
            ›
          </button>
        </>
      )}

      <div
        className="lightbox-stage"
        onClick={(e) => e.stopPropagation()}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
      >
        <img
          src={images[active]}
          alt=""
          draggable={false}
          onClick={toggleZoom}
          style={{
            transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
            cursor: scale > 1 ? "grab" : "zoom-in",
          }}
        />
      </div>
    </div>
  );
}
