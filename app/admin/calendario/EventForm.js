function toLocalInputValue(date) {
  if (!date) return "";
  const d = new Date(date);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function EventForm({ action, initial, submitLabel }) {
  return (
    <form action={action} className="admin-form">
      <div className="admin-form-row">
        <label className="admin-field">
          <span>Mês (3 letras)</span>
          <input type="text" name="month" required placeholder="AGO" maxLength={3} defaultValue={initial?.month} />
        </label>
        <label className="admin-field">
          <span>Dia</span>
          <input type="text" name="day" required placeholder="16 ou 16-17" defaultValue={initial?.day} />
          <span className="admin-hint">Podes escrever um intervalo, ex: "16-17", para eventos de vários dias.</span>
        </label>
      </div>

      <div className="admin-form-row">
        <label className="admin-field">
          <span>Início</span>
          <input type="datetime-local" name="fullDate" required defaultValue={toLocalInputValue(initial?.fullDate)} />
        </label>
        <label className="admin-field">
          <span>Fim (opcional)</span>
          <input type="datetime-local" name="endDate" defaultValue={toLocalInputValue(initial?.endDate)} />
          <span className="admin-hint">Só para eventos de vários dias. Deixa em branco se o evento for de um dia só.</span>
        </label>
      </div>

      <label className="admin-field">
        <span>Título</span>
        <input type="text" name="title" required defaultValue={initial?.title} />
      </label>

      <label className="admin-field">
        <span>Descrição</span>
        <textarea name="desc" required defaultValue={initial?.desc} />
      </label>

      <span className="admin-hint">
        O estado ("Agendado" / "Em breve" / "Concluído") já não precisa de ser escolhido à mão — é calculado sozinho a partir da data de início/fim.
      </span>

      <div className="admin-form-actions">
        <button type="submit" className="btn btn-lime">{submitLabel}</button>
      </div>
    </form>
  );
}
