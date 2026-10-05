"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "../../lib/authGuard";
import { prisma } from "../../lib/db";
import { saveUploadedImage } from "../../lib/upload";

function readFields(formData) {
  return {
    title: String(formData.get("title") || "").trim(),
    excerpt: String(formData.get("excerpt") || "").trim(),
    body: String(formData.get("body") || "").trim(),
    badge: String(formData.get("badge") || "").trim(),
    badgePink: formData.get("badgePink") === "on",
    icon: String(formData.get("icon") || "target"),
    grad: Number(formData.get("grad") || 1),
    catsCsv: String(formData.get("cats") || "").trim(),
    dateLabel: String(formData.get("dateLabel") || "").trim(),
    publishedAt: formData.get("publishedAt") ? new Date(String(formData.get("publishedAt"))) : new Date(),
  };
}

function revalidateAll() {
  revalidatePath("/");
  revalidatePath("/noticias");
  revalidatePath("/admin/noticias");
}

export async function createNews(formData) {
  await requireAdmin();
  const data = readFields(formData);
  const imageUrl = await saveUploadedImage(formData.get("image"), "news");
  if (imageUrl) data.imageUrl = imageUrl;
  await prisma.newsArticle.create({ data });
  revalidateAll();
  redirect("/admin/noticias");
}

export async function updateNews(id, formData) {
  await requireAdmin();
  const data = readFields(formData);
  const imageUrl = await saveUploadedImage(formData.get("image"), "news");
  if (imageUrl) data.imageUrl = imageUrl;
  await prisma.newsArticle.update({ where: { id }, data });
  revalidateAll();
  revalidatePath(`/noticias/${id}`);
  redirect("/admin/noticias");
}

export async function deleteNews(id) {
  await requireAdmin();
  await prisma.newsArticle.delete({ where: { id } });
  revalidateAll();
  redirect("/admin/noticias");
}
