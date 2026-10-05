"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "../../lib/authGuard";
import { prisma } from "../../lib/db";
import { saveUploadedImage } from "../../lib/upload";

const MAX_PARTNERS = 5;

function revalidateAll() {
  revalidatePath("/");
  revalidatePath("/admin/parceiros");
}

function readFields(formData) {
  return {
    name: String(formData.get("name") || "").trim(),
    link: String(formData.get("link") || "").trim(),
    order: Number(formData.get("order") || 0),
  };
}

export async function createPartner(formData) {
  await requireAdmin();
  const count = await prisma.partner.count();
  if (count >= MAX_PARTNERS) {
    redirect("/admin/parceiros");
  }
  const data = readFields(formData);
  const logoUrl = await saveUploadedImage(formData.get("logo"), "partners");
  if (!logoUrl) throw new Error("É necessário escolher um logótipo para criar um parceiro.");
  await prisma.partner.create({ data: { ...data, logoUrl } });
  revalidateAll();
  redirect("/admin/parceiros");
}

export async function updatePartner(id, formData) {
  await requireAdmin();
  const data = readFields(formData);
  const logoUrl = await saveUploadedImage(formData.get("logo"), "partners");
  if (logoUrl) data.logoUrl = logoUrl;
  await prisma.partner.update({ where: { id }, data });
  revalidateAll();
  redirect("/admin/parceiros");
}

export async function deletePartner(id) {
  await requireAdmin();
  await prisma.partner.delete({ where: { id } });
  revalidateAll();
  redirect("/admin/parceiros");
}
