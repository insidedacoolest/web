"use client";

import { useState } from "react";
import { submitGridWorksInquiry } from "../actions/gridworks";

const SERVICE_OPTIONS = [
  { value: "logotipo", label: "Logótipo" },
  { value: "livery", label: "Livery" },
  { value: "social-kit", label: "Kit de Redes Sociais" },
  { value: "social-management", label: "Gestão de Redes Sociais" },
  { value: "merchandise", label: "Merchandise" },
  { value: "website", label: "Website" },
  { value: "varios", label: "Não tenho a certeza" },
];

export default function GridWorksForm() {
  const [form, setForm] = useState({ name: "", email: "", team: "", services: [], message: "" });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const [sent, setSent] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function toggleService(value) {
    setForm((f) => ({
      ...f,
      services: f.services.includes(value)
        ? f.services.filter((v) => v !== value)
        : [...f.services, value],
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setPending(true);
    setError(null);
    const result = await submitGridWorksInquiry({ ...form, service: form.services.join(",") });
    setPending(false);
    if (result?.error) {
      setError(result.error);
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <div className="checkout-confirm" style={{ padding: "2rem 0" }}>
        <span className="eyebrow pink">Pedido recebido</span>
        <h2 className="display h2" style={{ marginTop: ".6rem" }}>Obrigado, {form.name.split(" ")[0]}!</h2>
        <p className="lede" style={{ marginTop: ".8rem" }}>
          Recebemos o teu pedido — vamos contactar-te em {form.email} para conversarmos sobre a proposta.
        </p>
      </div>
    );
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit} style={{ maxWidth: 640 }}>
      <div className="admin-form-row">
        <label className="admin-field">
          <span>Nome</span>
          <input type="text" required value={form.name} onChange={(e) => update("name", e.target.value)} />
        </label>
        <label className="admin-field">
          <span>Email</span>
          <input type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} />
        </label>
      </div>

      <label className="admin-field">
        <span>Piloto / Equipa (opcional)</span>
        <input type="text" value={form.team} onChange={(e) => update("team", e.target.value)} placeholder="Nome pelo qual competes ou nome da equipa" />
      </label>

      <div className="admin-field">
        <span>O que precisas? (escolhe uma ou mais opções)</span>
        <div className="checkbox-grid">
          {SERVICE_OPTIONS.map((o) => (
            <label className="admin-checkbox" key={o.value}>
              <input
                type="checkbox"
                checked={form.services.includes(o.value)}
                onChange={() => toggleService(o.value)}
              />
              <span>{o.label}</span>
            </label>
          ))}
        </div>
      </div>

      <label className="admin-field">
        <span>Conta-nos mais</span>
        <textarea required value={form.message} onChange={(e) => update("message", e.target.value)} rows={5} placeholder="O que já tens, o que procuras, prazos, referências que gostes..." />
      </label>

      {error && <p className="admin-error">{error}</p>}

      <div className="admin-form-actions">
        <button type="submit" className="btn btn-pink" disabled={pending}>
          {pending ? "A enviar…" : "Pedir orçamento"}
        </button>
      </div>
    </form>
  );
}
