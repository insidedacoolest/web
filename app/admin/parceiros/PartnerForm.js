export default function PartnerForm({ action, initial, submitLabel, requireLogo }) {
  return (
    <form action={action} className="admin-form">
      <label className="admin-field">
        <span>Logótipo</span>
        {initial?.logoUrl && (
          <img src={initial.logoUrl} alt="" className="admin-image-preview" />
        )}
        <input type="file" name="logo" accept="image/*" required={requireLogo} />
        {!requireLogo && (
          <span className="admin-hint">Deixa em branco para manter o logótipo atual.</span>
        )}
      </label>

      <label className="admin-field">
        <span>Nome do parceiro</span>
        <input type="text" name="name" required defaultValue={initial?.name} />
      </label>

      <label className="admin-field">
        <span>Link (para onde vai ao clicar)</span>
        <input type="url" name="link" required placeholder="https://..." defaultValue={initial?.link} />
      </label>

      <label className="admin-field">
        <span>Ordem</span>
        <input type="number" name="order" defaultValue={initial?.order ?? 0} />
        <span className="admin-hint">Números mais baixos aparecem primeiro no carrossel.</span>
      </label>

      <div className="admin-form-actions">
        <button type="submit" className="btn btn-lime">{submitLabel}</button>
      </div>
    </form>
  );
}
