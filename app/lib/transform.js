// Small helpers that turn flat DB rows (CSV/JSON text fields, required by
// SQLite's lack of native array/JSON columns) into the shape components expect.
import { localizedField } from "./i18n";

export function driverToView(d, locale) {
  return {
    ...d,
    name: `${d.firstName} ${d.lastName}`,
    bio: localizedField(d, "bio", locale),
    cats: d.catsCsv ? d.catsCsv.split(",") : [],
    champs: d.champsCsv ? d.champsCsv.split(",") : [],
    history: d.historyJson ? JSON.parse(d.historyJson) : [],
  };
}

export function newsToView(n, locale) {
  return {
    ...n,
    title: localizedField(n, "title", locale),
    excerpt: localizedField(n, "excerpt", locale),
    body: localizedField(n, "body", locale),
    cats: n.catsCsv ? n.catsCsv.split(",") : [],
    grad: `mgrad-${((n.grad - 1) % 4) + 1}`,
  };
}

export function productToView(p, locale) {
  const images = p.imagesJson ? JSON.parse(p.imagesJson) : [];
  return {
    ...p,
    name: localizedField(p, "name", locale),
    description: localizedField(p, "description", locale),
    cats: p.catsCsv ? p.catsCsv.split(",") : [],
    sizes: p.sizesCsv ? p.sizesCsv.split(",") : [],
    variants: p.variantsJson ? JSON.parse(p.variantsJson) : [],
    grad: `mgrad-${((p.grad - 1) % 4) + 1}`,
    colorVar: p.color === "pink" ? "var(--pink)" : "var(--lime)",
    images: images.length > 0 ? images : p.imageUrl ? [p.imageUrl] : [],
  };
}
