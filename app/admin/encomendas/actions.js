"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "../../lib/authGuard";
import { prisma } from "../../lib/db";

export async function updateOrderStatus(id, formData) {
  await requireAdmin();
  const status = String(formData.get("status") || "pendente");
  await prisma.order.update({ where: { id }, data: { status } });
  revalidatePath("/admin/encomendas");
  revalidatePath(`/admin/encomendas/${id}`);
}

export async function deleteOrder(id) {
  await requireAdmin();
  await prisma.order.delete({ where: { id } });
  revalidatePath("/admin/encomendas");
  redirect("/admin/encomendas");
}
