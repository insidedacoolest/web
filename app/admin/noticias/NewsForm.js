import { NEWS_ICON_KEYS } from "../../lib/icons";

function toDateInputValue(date) {
  if (!date) return "";
  const d = new Date(date);
  return d.toISOString().slice(0, 10);
}

export default function NewsForm({ action, initial, submitLabel }) {
  return (
    <form action={action} className="admin-form">
      <label className="admin-field">
        <span>Imagem de destaque</span>
        {initial?.imageUrl && (
          <img src={initial.imageUrl} alt="" className="admin-image-preview admin-image-preview-wide" />
        )}
        <input type="file" name="image" accept="image/*" />
        <span className="admin-hint">JPG, PNG ou WEBP, até 20MB. Deixa em branco para manter a imagem atual e usar o ícone.</span>
      </label>

      <label className="admin-field">
        <span>Título</span>
        <input type="text" name="title" required defaultValue={initial?.title} />
      </label>

      <label className="admin-field">
        <span>Resumo</span>
        <textarea name="excerpt" required defaultValue={initial?.excerpt} />
        <span className="admin-hint">Texto curto mostrado nos cartões de notícia.</span>
      </label>

      <label className="admin-field">
        <span>Corpo da Notícia</span>
        <textarea name="body" rows={12} defaultValue={initial?.body} />
        <span className="admin-hint">Texto completo mostrado na página da notícia. Podes usar linhas em branco para separar parágrafos.</span>
      </label>

      <div className="admin-form-row">
        <label className="admin-field">
          <span>Badge (etiqueta visível)</span>
          <input type="text" name="badge" required placeholder="CPD" defaultValue={initial?.badge} />
        </label>
        <label className="admin-field">
          <span>Data a mostrar</span>
          <input type="text" name="dateLabel" required placeholder="3 ago 2026" defaultValue={initial?.dateLabel} />
        </label>
      </div>

      <div className="admin-form-row">
        <label className="admin-field">
          <span>Ícone</span>
          <select name="icon" defaultValue={initial?.icon || "target"}>
            {NEWS_ICON_KEYS.map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
        </label>
        <label className="admin-field">
          <span>Cor de fundo (1-4)</span>
          <select name="grad" defaultValue={initial?.grad || 1}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select>
        </label>
      </div>

      <label className="admin-field">
        <span>Categorias (separadas por vírgula)</span>
        <input type="text" name="cats" required placeholder="cpd,internacional" defaultValue={initial?.catsCsv} />
        <span className="admin-hint">Usa: cpd, dmec, cfd, dss, internacional, tecnica</span>
      </label>

      <label className="admin-field">
        <span>Data de publicação (para ordenar)</span>
        <input type="date" name="publishedAt" defaultValue={toDateInputValue(initial?.publishedAt) || new Date().toISOString().slice(0, 10)} />
      </label>

      <label className="admin-field admin-checkbox">
        <input type="checkbox" name="badgePink" defaultChecked={initial?.badgePink} />
        <span>Badge em rosa (em vez de lima)</span>
      </label>

      <div className="admin-form-actions">
        <button type="submit" className="btn btn-lime">{submitLabel}</button>
      </div>
    </form>
  );
}
