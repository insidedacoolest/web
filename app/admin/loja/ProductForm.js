import { PRODUCT_ICON_KEYS } from "../../lib/icons";

function variantsToText(variantsJson) {
  if (!variantsJson) return "";
  try {
    const variants = JSON.parse(variantsJson);
    return variants.map((v) => `${v.label},${v.price}`).join("\n");
  } catch {
    return "";
  }
}

export default function ProductForm({ action, initial, submitLabel }) {
  const images = initial?.imagesJson ? JSON.parse(initial.imagesJson) : [];

  return (
    <form action={action} className="admin-form">
      <label className="admin-field">
        <span>Fotos do produto</span>
        {images.length > 0 && (
          <div className="admin-image-grid">
            {images.map((url) => (
              <label key={url} className="admin-image-remove">
                <img src={url} alt="" className="admin-image-preview" />
                <span className="admin-checkbox">
                  <input type="checkbox" name="removeImages" value={url} />
                  <span>Remover</span>
                </span>
              </label>
            ))}
          </div>
        )}
        <input type="file" name="images" accept="image/*" multiple />
        <span className="admin-hint">JPG, PNG ou WEBP, até 20MB cada. Podes escolher várias fotos de uma vez — são adicionadas às já existentes. A primeira foto é usada como capa. Tamanho recomendado: 1250x1500px — outras proporções aparecem cortadas.</span>
      </label>

      <label className="admin-field">
        <span>Nome do produto</span>
        <input type="text" name="name" required defaultValue={initial?.name} />
      </label>

      <label className="admin-field">
        <span>Descrição</span>
        <textarea name="description" defaultValue={initial?.description} />
      </label>

      <div className="admin-form-row">
        <label className="admin-field">
          <span>Preço (€)</span>
          <input type="number" step="0.01" name="price" required defaultValue={initial?.price} />
        </label>
        <label className="admin-field">
          <span>Preço antigo (opcional, para promoção)</span>
          <input type="number" step="0.01" name="oldPrice" defaultValue={initial?.oldPrice ?? ""} />
        </label>
      </div>

      <label className="admin-field">
        <span>Categoria (separadas por vírgula)</span>
        <input type="text" name="cats" required placeholder="vestuario" defaultValue={initial?.catsCsv} />
        <span className="admin-hint">Usa: vestuario, acessorios, colecionaveis, publicidade</span>
      </label>

      <label className="admin-field">
        <span>Tamanhos (opcional, separados por vírgula)</span>
        <input type="text" name="sizes" placeholder="S,M,L,XL,2XL" defaultValue={initial?.sizesCsv || ""} />
        <span className="admin-hint">Usa isto quando todos os tamanhos têm o mesmo preço. Deixa em branco para produtos sem tamanho (acessórios, colecionáveis).</span>
      </label>

      <label className="admin-field">
        <span>Variantes com preços diferentes (opcional)</span>
        <textarea name="variants" placeholder={"S,19.90\nM,19.90\nL,22.90\nXL,24.90"} defaultValue={variantsToText(initial?.variantsJson)} />
        <span className="admin-hint">
          Uma variante por linha: Nome,Preço. Usa para tamanhos ou características (cor, edição, etc.) que tenham preços diferentes entre si.
          Se preenchido, substitui o campo "Tamanhos" acima na loja.
        </span>
      </label>

      <label className="admin-field admin-checkbox">
        <input type="checkbox" name="inStock" defaultChecked={initial ? initial.inStock : true} />
        <span>Em stock (disponível para compra)</span>
      </label>

      <div className="admin-form-row">
        <label className="admin-field">
          <span>Ícone</span>
          <select name="icon" defaultValue={initial?.icon || "shirt"}>
            {PRODUCT_ICON_KEYS.map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
        </label>
        <label className="admin-field">
          <span>Cor</span>
          <select name="color" defaultValue={initial?.color || "lime"}>
            <option value="lime">Lima</option>
            <option value="pink">Rosa</option>
          </select>
        </label>
      </div>

      <label className="admin-field">
        <span>Fundo do cartão (1-4)</span>
        <select name="grad" defaultValue={initial?.grad || 1}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
        </select>
      </label>

      <div className="admin-form-actions">
        <button type="submit" className="btn btn-lime">{submitLabel}</button>
      </div>
    </form>
  );
}
