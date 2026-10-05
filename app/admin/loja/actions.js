"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "../../lib/authGuard";
import { prisma } from "../../lib/db";
import { saveUploadedImage } from "../../lib/upload";

function parseVariants(text) {
  return String(text || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, priceRaw] = line.split(",").map((s) => s.trim());
      return { label, price: Number(priceRaw || 0) };
    })
    .filter((v) => v.label);
}

function readFields(formData) {
  const oldPriceRaw = String(formData.get("oldPrice") || "").trim();
  const sizesRaw = String(formData.get("sizes") || "").trim();
  return {
    name: String(formData.get("name") || "").trim(),
    description: String(formData.get("description") || "").trim(),
    price: Number(formData.get("price") || 0),
    oldPrice: oldPriceRaw ? Number(oldPriceRaw) : null,
    catsCsv: String(formData.get("cats") || "").trim(),
    sizesCsv: sizesRaw || null,
    variantsJson: JSON.stringify(parseVariants(formData.get("variants"))),
    inStock: formData.get("inStock") === "on",
    icon: String(formData.get("icon") || "shirt"),
    color: String(formData.get("color") || "lime"),
    grad: Number(formData.get("grad") || 1),
  };
}

function revalidateAll() {
  revalidatePath("/");
  revalidatePath("/loja");
  revalidatePath("/admin/loja");
}

async function saveNewImages(formData) {
  const files = formData.getAll("images").filter((f) => f && typeof f === "object" && f.size > 0);
  const urls = [];
  for (const file of files) {
    const url = await saveUploadedImage(file, "products");
    if (url) urls.push(url);
  }
  return urls;
}

export async function createProduct(formData) {
  await requireAdmin();
  const data = readFields(formData);
  const images = await saveNewImages(formData);
  data.imagesJson = JSON.stringify(images);
  data.imageUrl = images[0] || null;
  await prisma.product.create({ data });
  revalidateAll();
  redirect("/admin/loja");
}

export async function updateProduct(id, formData) {
  await requireAdmin();
  const data = readFields(formData);
  const existing = await prisma.product.findUnique({ where: { id }, select: { imagesJson: true } });
  const kept = (existing?.imagesJson ? JSON.parse(existing.imagesJson) : []).filter(
    (url) => !formData.getAll("removeImages").includes(url)
  );
  const newImages = await saveNewImages(formData);
  const images = [...kept, ...newImages];
  data.imagesJson = JSON.stringify(images);
  data.imageUrl = images[0] || null;
  await prisma.product.update({ where: { id }, data });
  revalidateAll();
  revalidatePath(`/loja/${id}`);
  redirect("/admin/loja");
}

export async function deleteProduct(id) {
  await requireAdmin();
  await prisma.product.delete({ where: { id } });
  revalidateAll();
  redirect("/admin/loja");
}
