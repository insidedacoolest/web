"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "../../lib/authGuard";
import { prisma } from "../../lib/db";

export async function updateInquiryStatus(id, formData) {
  await requireAdmin();
  const status = String(formData.get("status") || "novo");
  await prisma.gridWorksInquiry.update({ where: { id }, data: { status } });
  revalidatePath("/admin/grid-works");
  revalidatePath(`/admin/grid-works/${id}`);
}

export async function deleteInquiry(id) {
  await requireAdmin();
  await prisma.gridWorksInquiry.delete({ where: { id } });
  revalidatePath("/admin/grid-works");
  redirect("/admin/grid-works");
}
