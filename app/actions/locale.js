"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LOCALES, DEFAULT_LOCALE, LOCALE_COOKIE } from "../lib/i18n";

export async function setLocale(formData) {
  const requested = String(formData.get("locale") || DEFAULT_LOCALE);
  const locale = LOCALES.includes(requested) ? requested : DEFAULT_LOCALE;
  const path = String(formData.get("path") || "/");

  (await cookies()).set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  redirect(path);
}
