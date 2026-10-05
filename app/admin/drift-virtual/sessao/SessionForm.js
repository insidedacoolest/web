export default function SessionForm({ action, initial }) {
  return (
    <form action={action} className="admin-form">
      <label className="admin-field">
        <span>Título</span>
        <input type="text" name="title" required placeholder="Liga de sexta-feira — Ebisu Minami" defaultValue={initial?.title} />
      </label>

      <label className="admin-field">
        <span>Detalhes</span>
        <input type="text" name="details" required placeholder="Qualificação às 21h00 · Batalhas às 22h00 · Voz no Discord" defaultValue={initial?.details} />
      </label>

      <label className="admin-field">
        <span>Link do Discord (opcional)</span>
        <input type="url" name="discordUrl" placeholder="https://discord.gg/..." defaultValue={initial?.discordUrl || ""} />
      </label>

      <div className="admin-form-actions">
        <button type="submit" className="btn btn-lime">Guardar</button>
      </div>
    </form>
  );
}
