function historyToText(historyJson) {
  if (!historyJson) return "";
  try {
    const h = JSON.parse(historyJson);
    return h.map((row) => `${row.season},${row.standing},${row.points}`).join("\n");
  } catch {
    return "";
  }
}

export default function DriverForm({ action, initial, submitLabel }) {
  return (
    <form action={action} className="admin-form">
      <label className="admin-field">
        <span>Foto do piloto</span>
        {initial?.imageUrl && (
          <img src={initial.imageUrl} alt="" className="admin-image-preview" />
        )}
        <input type="file" name="image" accept="image/*" />
        <span className="admin-hint">JPG, PNG ou WEBP, até 20MB. Deixa em branco para manter a foto atual.</span>
      </label>

      <div className="admin-form-row">
        <label className="admin-field">
          <span>Nome próprio</span>
          <input type="text" name="firstName" required defaultValue={initial?.firstName} />
        </label>
        <label className="admin-field">
          <span>Apelido</span>
          <input type="text" name="lastName" required defaultValue={initial?.lastName} />
        </label>
      </div>

      <div className="admin-form-row">
        <label className="admin-field">
          <span>Slug (URL: /pilotos/…)</span>
          <input type="text" name="slug" required placeholder="ruben-teixeira" defaultValue={initial?.slug} />
        </label>
        <label className="admin-field">
          <span>Número de arranque</span>
          <input type="text" name="num" required placeholder="07" defaultValue={initial?.num} />
        </label>
      </div>

      <div className="admin-form-row">
        <label className="admin-field">
          <span>Equipa</span>
          <input type="text" name="team" defaultValue={initial?.team} />
        </label>
        <label className="admin-field">
          <span>Carro</span>
          <input type="text" name="car" required defaultValue={initial?.car} />
        </label>
      </div>

      <div className="admin-form-row">
        <label className="admin-field">
          <span>Potência (CV)</span>
          <input type="number" name="power" defaultValue={initial?.power ?? 0} />
        </label>
        <label className="admin-field">
          <span>Bandeira (emoji)</span>
          <input type="text" name="flag" placeholder="🇵🇹" defaultValue={initial?.flag} />
        </label>
      </div>

      <div className="admin-form-row">
        <label className="admin-field">
          <span>Nacionalidade</span>
          <input type="text" name="nationality" defaultValue={initial?.nationality} />
        </label>
        <label className="admin-field">
          <span>Data de nascimento</span>
          <input type="text" name="birthDate" placeholder="12 mar 1998" defaultValue={initial?.birthDate} />
        </label>
      </div>

      <label className="admin-field">
        <span>Naturalidade</span>
        <input type="text" name="born" placeholder="Braga, Portugal" defaultValue={initial?.born} />
      </label>

      <div className="admin-form-row">
        <label className="admin-field">
          <span>Categorias (separadas por vírgula)</span>
          <input type="text" name="cats" required placeholder="cpd,pro" defaultValue={initial?.catsCsv} />
          <span className="admin-hint">cpd/dmec/cfd/dss + pro ou rookie</span>
        </label>
        <label className="admin-field">
          <span>Campeonatos (etiquetas, separados por vírgula)</span>
          <input type="text" name="champs" required placeholder="CPD" defaultValue={initial?.champsCsv} />
        </label>
      </div>

      <div className="admin-form-row">
        <label className="admin-field">
          <span>Posição atual</span>
          <input type="number" name="standing" defaultValue={initial?.standing ?? 0} />
        </label>
        <label className="admin-field">
          <span>Pontos</span>
          <input type="number" name="points" defaultValue={initial?.points ?? 0} />
        </label>
      </div>

      <div className="admin-form-row">
        <label className="admin-field">
          <span>Melhor posição</span>
          <input type="number" name="bestStanding" defaultValue={initial?.bestStanding ?? 0} />
        </label>
        <label className="admin-field">
          <span>Vitórias</span>
          <input type="number" name="wins" defaultValue={initial?.wins ?? 0} />
        </label>
      </div>

      <label className="admin-field">
        <span>Pódios</span>
        <input type="number" name="podiums" defaultValue={initial?.podiums ?? 0} />
      </label>

      <label className="admin-field">
        <span>Instagram (link)</span>
        <input type="url" name="instagram" defaultValue={initial?.instagram} />
      </label>

      <label className="admin-field">
        <span>Biografia</span>
        <textarea name="bio" required defaultValue={initial?.bio} />
      </label>

      <label className="admin-field">
        <span>Histórico por época (uma linha por época: época,posição,pontos)</span>
        <textarea name="history" placeholder="2026,1,312&#10;2025,3,245" defaultValue={historyToText(initial?.historyJson)} />
      </label>

      <label className="admin-field admin-checkbox">
        <input type="checkbox" name="featured" defaultChecked={initial?.featured} />
        <span>Destacar na página inicial</span>
      </label>
      <span className="admin-hint">Os pilotos destacados aparecem primeiro na secção "Pilotos" da página inicial (até 4). Se destacares menos de 4, as vagas restantes são preenchidas pelos melhores classificados.</span>

      <div className="admin-form-actions">
        <button type="submit" className="btn btn-lime">{submitLabel}</button>
      </div>
    </form>
  );
}
