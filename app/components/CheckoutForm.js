"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "./CartContext";
import { createOrder } from "../actions/shop";

export default function CheckoutForm() {
  const { items, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", notes: "" });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const [orderId, setOrderId] = useState(null);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setPending(true);
    setError(null);
    const result = await createOrder({ ...form, items });
    setPending(false);
    if (result?.error) {
      setError(result.error);
      return;
    }
    setOrderId(result.orderId);
    clearCart();
  }

  if (orderId) {
    return (
      <div className="checkout-confirm">
        <span className="eyebrow">Encomenda #{orderId}</span>
        <h2 className="display h2" style={{ marginTop: ".6rem" }}>Encomenda recebida!</h2>
        <p className="lede" style={{ marginTop: ".8rem" }}>
          Obrigado, {form.name.split(" ")[0]}. Vamos entrar em contacto por email ou telefone para
          combinar o pagamento e o envio.
        </p>
        <Link href="/loja" className="btn btn-lime" style={{ marginTop: "1.6rem" }}>Voltar à loja</Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="checkout-confirm">
        <p className="lede">O teu carrinho está vazio.</p>
        <Link href="/loja" className="btn btn-lime" style={{ marginTop: "1.2rem" }}>Ver produtos</Link>
      </div>
    );
  }

  return (
    <div className="checkout-grid">
      <form className="admin-form" onSubmit={handleSubmit}>
        <label className="admin-field">
          <span>Nome</span>
          <input type="text" required value={form.name} onChange={(e) => update("name", e.target.value)} />
        </label>
        <div className="admin-form-row">
          <label className="admin-field">
            <span>Email</span>
            <input type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} />
          </label>
          <label className="admin-field">
            <span>Telefone</span>
            <input type="tel" required value={form.phone} onChange={(e) => update("phone", e.target.value)} />
          </label>
        </div>
        <label className="admin-field">
          <span>Morada de envio</span>
          <input type="text" required value={form.address} onChange={(e) => update("address", e.target.value)} />
        </label>
        <label className="admin-field">
          <span>Notas (opcional)</span>
          <textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} />
        </label>

        {error && <p className="admin-error">{error}</p>}

        <div className="admin-form-actions">
          <button type="submit" className="btn btn-lime" disabled={pending}>
            {pending ? "A enviar…" : "Confirmar encomenda"}
          </button>
        </div>
        <p className="cart-note">Sem pagamento online — combinamos o pagamento (MB Way, transferência, etc.) depois de recebermos a encomenda.</p>
      </form>

      <div className="checkout-summary">
        <h3 className="info-panel-title">Resumo</h3>
        <div className="cart-items" style={{ padding: 0, maxHeight: "none" }}>
          {items.map((item) => (
            <div className="cart-item" key={`${item.id}-${item.size || "u"}`}>
              <div>
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-meta">
                  {item.size ? `Tamanho: ${item.size} · ` : ""}Qtd: {item.qty} · {(item.price * item.qty).toFixed(2)} €
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-total" style={{ marginTop: "1rem" }}><span>Total</span><b>{totalPrice.toFixed(2)} €</b></div>
      </div>
    </div>
  );
}
