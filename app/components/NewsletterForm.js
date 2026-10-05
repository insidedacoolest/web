"use client";

import { useState } from "react";

export default function NewsletterForm({ center = false }) {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return <p className="newsletter-note">Obrigado! Confirma a subscrição no teu email.</p>;
  }

  return (
    <form
      className="newsletter-form"
      onSubmit={handleSubmit}
      style={center ? { maxWidth: 420, margin: "0 auto" } : undefined}
    >
      <input type="email" required placeholder="o-teu-email@exemplo.pt" aria-label="Email" />
      <button type="submit">Subscrever</button>
    </form>
  );
}
