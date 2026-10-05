"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "../../lib/authGuard";
import { prisma } from "../../lib/db";
import { saveUploadedImage } from "../../lib/upload";

function revalidateAll() {
  revalidatePath("/");
  revalidatePath("/drift-virtual");
  revalidatePath("/admin/banners");
}

function readFields(formData) {
  return {
    slot: String(formData.get("slot") || "").trim(),
    title: String(formData.get("title") || "").trim(),
    linkUrl: String(formData.get("linkUrl") || "").trim() || null,
    position: String(formData.get("position") || "center").trim(),
  };
}

export async function createBanner(formData) {
  await requireAdmin();
  const data = readFields(formData);
  const imageUrl = await saveUploadedImage(formData.get("image"), "banners");
  if (!imageUrl) throw new Error("É necessário escolher uma imagem para criar um banner.");
  await prisma.banner.create({ data: { ...data, imageUrl } });
  revalidateAll();
  redirect("/admin/banners");
}

export async function updateBanner(id, formData) {
  await requireAdmin();
  const data = readFields(formData);
  const imageUrl = await saveUploadedImage(formData.get("image"), "banners");
  if (imageUrl) data.imageUrl = imageUrl;
  await prisma.banner.update({ where: { id }, data });
  revalidateAll();
  redirect("/admin/banners");
}

export async function deleteBanner(id) {
  await requireAdmin();
  await prisma.banner.delete({ where: { id } });
  revalidateAll();
  redirect("/admin/banners");
}
