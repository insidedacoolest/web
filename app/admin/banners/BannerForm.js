export default function BannerForm({ action, initial, submitLabel, requireImage }) {
  return (
    <form action={action} className="admin-form">
      <label className="admin-field">
        <span>Imagem</span>
        {initial?.imageUrl && (
          <img src={initial.imageUrl} alt="" className="admin-image-preview admin-image-preview-wide" />
        )}
        <input type="file" name="image" accept="image/*" required={requireImage} />
        {!requireImage && (
          <span className="admin-hint">Deixa em branco para manter a imagem atual.</span>
        )}
      </label>

      <label className="admin-field">
        <span>Posição da imagem</span>
        <select name="position" defaultValue={initial?.position || "center"}>
          <option value="left top">Superior esquerda</option>
          <option value="center top">Superior centro</option>
          <option value="right top">Superior direita</option>
          <option value="left center">Centro esquerda</option>
          <option value="center">Centro</option>
          <option value="right center">Centro direita</option>
          <option value="left bottom">Inferior esquerda</option>
          <option value="center bottom">Inferior centro</option>
          <option value="right bottom">Inferior direita</option>
        </select>
        <span className="admin-hint">Escolhe que parte da imagem fica visível quando ela é cortada para preencher a secção.</span>
      </label>

      <label className="admin-field">
        <span>Slot</span>
        <input type="text" name="slot" required placeholder="home_hero" defaultValue={initial?.slot} />
        <span className="admin-hint">Usa: home_hero, home_virtual ou drift_virtual_hero</span>
      </label>

      <label className="admin-field">
        <span>Título / descrição interna</span>
        <input type="text" name="title" required defaultValue={initial?.title} />
      </label>

      <label className="admin-field">
        <span>Link (opcional)</span>
        <input type="url" name="linkUrl" defaultValue={initial?.linkUrl || ""} />
      </label>

      <div className="admin-form-actions">
        <button type="submit" className="btn btn-lime">{submitLabel}</button>
      </div>
    </form>
  );
}
