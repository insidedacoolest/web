export default function EntryForm({ action, initial, submitLabel }) {
  return (
    <form action={action} className="admin-form">
      <div className="admin-form-row">
        <label className="admin-field">
          <span>Posição</span>
          <input type="number" name="pos" required defaultValue={initial?.pos ?? 1} />
        </label>
        <label className="admin-field">
          <span>Pontuação</span>
          <input type="text" name="score" required placeholder="98.4" defaultValue={initial?.score} />
        </label>
      </div>

      <label className="admin-field">
        <span>Jogador</span>
        <input type="text" name="name" required defaultValue={initial?.name} />
      </label>

      <label className="admin-field">
        <span>Plataforma</span>
        <input type="text" name="platform" required placeholder="Assetto Corsa" defaultValue={initial?.platform} />
      </label>

      <div className="admin-form-actions">
        <button type="submit" className="btn btn-lime">{submitLabel}</button>
      </div>
    </form>
  );
}
