import "server-only";
import { cookies } from "next/headers";

export const LOCALES = ["pt", "en", "es", "fr"];
export const DEFAULT_LOCALE = "pt";
export const LOCALE_COOKIE = "df_locale";

export async function getLocale() {
  const value = (await cookies()).get(LOCALE_COOKIE)?.value;
  return LOCALES.includes(value) ? value : DEFAULT_LOCALE;
}

// Reads `<base>En` / `<base>Es` / `<base>Fr` off a Prisma row for the given
// locale, falling back to the base (Portuguese) field when the translation
// is missing/blank or the locale is "pt".
export function localizedField(row, base, locale) {
  if (!row) return "";
  if (!locale || locale === DEFAULT_LOCALE) return row[base] ?? "";
  const key = `${base}${locale.charAt(0).toUpperCase()}${locale.slice(1)}`;
  return row[key] || row[base] || "";
}
