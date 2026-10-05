"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "../../lib/authGuard";
import { prisma } from "../../lib/db";

function revalidateAll() {
  revalidatePath("/");
  revalidatePath("/resultados");
  revalidatePath("/admin/resultados");
}

function parseRows(text, rounds) {
  return String(text || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split(",").map((p) => p.trim());
      const [name, country, car, ...pts] = parts;
      const points = Array.from({ length: rounds }, (_, i) => Number(pts[i]) || 0);
      return { name: name || "", country: country || "", car: car || "", points };
    })
    .filter((r) => r.name);
}

function readRoundFields(formData) {
  const rounds = Math.max(1, Number(formData.get("rounds") || 1));
  return {
    champCode: String(formData.get("champCode") || "").trim().toUpperCase(),
    eyebrow: String(formData.get("eyebrow") || "").trim(),
    eyebrowPink: formData.get("eyebrowPink") === "on",
    rounds,
    col3Label: String(formData.get("col3Label") || "País").trim(),
    rowsJson: JSON.stringify(parseRows(formData.get("rows"), rounds)),
  };
}

export async function createRound(formData) {
  await requireAdmin();
  await prisma.resultRound.create({ data: readRoundFields(formData) });
  revalidateAll();
  redirect("/admin/resultados");
}

export async function updateRound(id, formData) {
  await requireAdmin();
  await prisma.resultRound.update({ where: { id }, data: readRoundFields(formData) });
  revalidateAll();
  redirect("/admin/resultados");
}

export async function deleteRound(id) {
  await requireAdmin();
  await prisma.resultRound.delete({ where: { id } });
  revalidateAll();
  redirect("/admin/resultados");
}
