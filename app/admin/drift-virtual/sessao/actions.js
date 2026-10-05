"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "../../../lib/authGuard";
import { prisma } from "../../../lib/db";

export async function saveSession(formData) {
  await requireAdmin();
  const data = {
    title: String(formData.get("title") || "").trim(),
    details: String(formData.get("details") || "").trim(),
    discordUrl: String(formData.get("discordUrl") || "").trim() || null,
  };

  const existing = await prisma.virtualSession.findFirst();
  if (existing) {
    await prisma.virtualSession.update({ where: { id: existing.id }, data });
  } else {
    await prisma.virtualSession.create({ data });
  }

  revalidatePath("/drift-virtual");
  revalidatePath("/admin/drift-virtual/sessao");
  redirect("/admin/drift-virtual");
}
