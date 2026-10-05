function rowsToText(rowsJson) {
  let rows = [];
  try {
    rows = JSON.parse(rowsJson || "[]");
  } catch {
    rows = [];
  }
  return rows.map((r) => [r.name, r.country, r.car, ...(r.points || [])].join(",")).join("\n");
}

export default function RoundForm({ action, initial, submitLabel }) {
  return (
    <form action={action} className="admin-form">
      <div className="admin-form-row">
        <label className="admin-field">
          <span>Código do campeonato</span>
          <input type="text" name="champCode" required placeholder="CPD" defaultValue={initial?.champCode} />
        </label>
        <label className="admin-field">
          <span>Etiqueta (ex: "Classificação geral (Pro)")</span>
          <input type="text" name="eyebrow" required defaultValue={initial?.eyebrow} />
        </label>
      </div>

      <div className="admin-form-row">
        <label className="admin-field">
          <span>Número de rondas</span>
          <input type="number" name="rounds" min="1" required defaultValue={initial?.rounds ?? 1} />
          <span className="admin-hint">Quantas colunas R1, R2, ... vão aparecer na tabela.</span>
        </label>
        <label className="admin-field">
          <span>Nome da 3ª coluna da tabela</span>
          <input type="text" name="col3Label" placeholder="País ou Equipa" defaultValue={initial?.col3Label || "País"} />
        </label>
      </div>

      <label className="admin-field admin-checkbox">
        <input type="checkbox" name="eyebrowPink" defaultChecked={initial?.eyebrowPink} />
        <span>Etiqueta em rosa (em vez de lima)</span>
      </label>

      <label className="admin-field">
        <span>Pilotos</span>
        <textarea
          name="rows"
          rows={16}
          placeholder={"Uma linha por piloto:\nNome,País,Carro,R1,R2,R3,...\n\nHugo Costa,Portugal,BMW E46,76,93,102,98,102,0\nRaman Kandratsenka,Portugal,—,112,120,120,92,0,0"}
          defaultValue={rowsToText(initial?.rowsJson)}
        />
        <span className="admin-hint">
          Um piloto por linha, separado por vírgulas: Nome, País, Carro, e depois um número por ronda (tantos números quanto o "Número de rondas" acima).
          Deixa o Carro vazio se não tiveres essa informação. A posição de cada piloto é calculada automaticamente pela soma dos pontos.
        </span>
      </label>

      <div className="admin-form-actions">
        <button type="submit" className="btn btn-lime">{submitLabel}</button>
      </div>
    </form>
  );
}
