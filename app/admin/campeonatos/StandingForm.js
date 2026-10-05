export default function StandingForm({ action, initial, submitLabel }) {
  return (
    <form action={action} className="admin-form">
      <div className="admin-form-row">
        <label className="admin-field">
          <span>Código do campeonato</span>
          <input type="text" name="champCode" required placeholder="CPD" defaultValue={initial?.champCode} />
        </label>
        <label className="admin-field">
          <span>Posição</span>
          <input type="number" name="pos" required defaultValue={initial?.pos ?? 1} />
        </label>
      </div>

      <label className="admin-field">
        <span>Piloto</span>
        <input type="text" name="name" required defaultValue={initial?.name} />
      </label>

      <div className="admin-form-row">
        <label className="admin-field">
          <span>Equipa / País</span>
          <input type="text" name="team" required defaultValue={initial?.team} />
        </label>
        <label className="admin-field">
          <span>Carro</span>
          <input type="text" name="car" required defaultValue={initial?.car} />
        </label>
      </div>

      <label className="admin-field">
        <span>Pontos</span>
        <input type="number" name="points" defaultValue={initial?.points ?? 0} />
      </label>

      <div className="admin-form-actions">
        <button type="submit" className="btn btn-lime">{submitLabel}</button>
      </div>
    </form>
  );
}
