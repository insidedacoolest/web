"use client";

import Link from "next/link";
import { useCart } from "./CartContext";

export default function CartDrawer() {
  const { items, removeItem, updateQty, totalPrice, open, setOpen } = useCart();

  return (
    <>
      <div
        className={`backdrop${open ? " open" : ""}`}
        onClick={() => setOpen(false)}
      />
      <aside className={`cart-drawer${open ? " open" : ""}`} aria-label="Carrinho de compras">
        <div className="cart-head">
          <h3>O teu carrinho</h3>
          <button className="cart-close" aria-label="Fechar carrinho" onClick={() => setOpen(false)}>✕</button>
        </div>
        <div className="cart-items">
          {items.length === 0 ? (
            <p className="cart-empty">O teu carrinho está vazio.</p>
          ) : (
            items.map((item) => (
              <div className="cart-item" key={`${item.id}-${item.size || "u"}`}>
                <div>
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-meta">
                    {item.size ? `Tamanho: ${item.size} · ` : ""}{(item.price * item.qty).toFixed(2)} €
                  </div>
                  <div className="cart-item-qty">
                    <button type="button" onClick={() => updateQty(item.id, item.size, item.qty - 1)} aria-label="Diminuir quantidade">−</button>
                    <span>{item.qty}</span>
                    <button type="button" onClick={() => updateQty(item.id, item.size, item.qty + 1)} aria-label="Aumentar quantidade">+</button>
                  </div>
                </div>
                <button className="cart-item-remove" onClick={() => removeItem(item.id, item.size)}>
                  Remover
                </button>
              </div>
            ))
          )}
        </div>
        <div className="cart-foot">
          <div className="cart-total"><span>Total</span><b>{totalPrice.toFixed(2)} €</b></div>
          {items.length === 0 ? (
            <button className="btn btn-lime btn-block" type="button" disabled>
              Finalizar compra
            </button>
          ) : (
            <Link href="/loja/checkout" className="btn btn-lime btn-block" onClick={() => setOpen(false)}>
              Finalizar compra
            </Link>
          )}
          <p className="cart-note">Encomenda registada manualmente — combinamos o pagamento e envio depois.</p>
        </div>
      </aside>
    </>
  );
}
