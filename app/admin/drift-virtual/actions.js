"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "../../lib/authGuard";
import { prisma } from "../../lib/db";

function revalidateAll() {
  revalidatePath("/drift-virtual");
  revalidatePath("/admin/drift-virtual");
}

function readFields(formData) {
  return {
    pos: Number(formData.get("pos") || 0),
    name: String(formData.get("name") || "").trim(),
    platform: String(formData.get("platform") || "").trim(),
    score: String(formData.get("score") || "").trim(),
  };
}

export async function createEntry(formData) {
  await requireAdmin();
  await prisma.leaderboardEntry.create({ data: readFields(formData) });
  revalidateAll();
  redirect("/admin/drift-virtual");
}

export async function updateEntry(id, formData) {
  await requireAdmin();
  await prisma.leaderboardEntry.update({ where: { id }, data: readFields(formData) });
  revalidateAll();
  redirect("/admin/drift-virtual");
}

export async function deleteEntry(id) {
  await requireAdmin();
  await prisma.leaderboardEntry.delete({ where: { id } });
  revalidateAll();
  redirect("/admin/drift-virtual");
}
