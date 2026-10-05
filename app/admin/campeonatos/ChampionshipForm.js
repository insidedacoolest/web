export default function ChampionshipForm({ action, initial, submitLabel }) {
  return (
    <form action={action} className="admin-form">
      <div className="admin-form-row">
        <label className="admin-field">
          <span>Código</span>
          <input type="text" name="code" required placeholder="CPD" defaultValue={initial?.code} />
        </label>
        <label className="admin-field">
          <span>Âmbito</span>
          <input type="text" name="scope" required placeholder="Nacional" defaultValue={initial?.scope} />
        </label>
      </div>

      <label className="admin-field">
        <span>Nome completo</span>
        <input type="text" name="name" required defaultValue={initial?.name} />
      </label>

      <label className="admin-field">
        <span>Descrição</span>
        <textarea name="desc" required defaultValue={initial?.desc} />
      </label>

      <label className="admin-field">
        <span>Número de rondas</span>
        <input type="number" name="rounds" defaultValue={initial?.rounds ?? 0} />
      </label>

      <div className="admin-form-actions">
        <button type="submit" className="btn btn-lime">{submitLabel}</button>
      </div>
    </form>
  );
}
