function toDateInputValue(date) {
  if (!date) return "";
  const d = new Date(date);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export default function CalendarEntryForm({ action, initial, submitLabel }) {
  return (
    <form action={action} className="admin-form">
      <label className="admin-field">
        <span>Data</span>
        <input type="date" name="date" required defaultValue={toDateInputValue(initial?.date)} />
      </label>

      <label className="admin-field">
        <span>Etiqueta</span>
        <input type="text" name="label" required placeholder="Liga sexta-feira" defaultValue={initial?.label} />
      </label>

      <label className="admin-field">
        <span>Local / detalhe</span>
        <input type="text" name="location" required placeholder="Ebisu Minami" defaultValue={initial?.location} />
      </label>

      <label className="admin-field">
        <span>Estilo no calendário</span>
        <select name="style" defaultValue={initial?.style || "fill"}>
          <option value="fill">Preenchido (destaque cheio)</option>
          <option value="outline">Contorno (ex: track day)</option>
        </select>
      </label>

      <div className="admin-form-actions">
        <button type="submit" className="btn btn-lime">{submitLabel}</button>
      </div>
    </form>
  );
}
