"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "../../lib/authGuard";
import { prisma } from "../../lib/db";
import { saveUploadedImage } from "../../lib/upload";

function parseHistory(text) {
  return String(text || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [season, standing, points] = line.split(",").map((v) => Number(v.trim()));
      return { season, standing, points };
    })
    .filter((h) => Number.isFinite(h.season));
}

function readFields(formData) {
  return {
    slug: String(formData.get("slug") || "").trim(),
    num: String(formData.get("num") || "").trim(),
    firstName: String(formData.get("firstName") || "").trim(),
    lastName: String(formData.get("lastName") || "").trim(),
    team: String(formData.get("team") || "").trim(),
    car: String(formData.get("car") || "").trim(),
    power: Number(formData.get("power") || 0),
    nationality: String(formData.get("nationality") || "").trim(),
    flag: String(formData.get("flag") || "").trim(),
    birthDate: String(formData.get("birthDate") || "").trim(),
    born: String(formData.get("born") || "").trim(),
    catsCsv: String(formData.get("cats") || "").trim(),
    champsCsv: String(formData.get("champs") || "").trim(),
    standing: Number(formData.get("standing") || 0),
    points: Number(formData.get("points") || 0),
    bestStanding: Number(formData.get("bestStanding") || 0),
    wins: Number(formData.get("wins") || 0),
    podiums: Number(formData.get("podiums") || 0),
    bio: String(formData.get("bio") || "").trim(),
    instagram: String(formData.get("instagram") || "").trim(),
    historyJson: JSON.stringify(parseHistory(formData.get("history"))),
    featured: formData.get("featured") === "on",
  };
}

function revalidateAll(slug) {
  revalidatePath("/");
  revalidatePath("/pilotos");
  revalidatePath("/admin/pilotos");
  if (slug) revalidatePath(`/pilotos/${slug}`);
}

export async function createDriver(formData) {
  await requireAdmin();
  const data = readFields(formData);
  const imageUrl = await saveUploadedImage(formData.get("image"), "drivers");
  if (imageUrl) data.imageUrl = imageUrl;
  await prisma.driver.create({ data });
  revalidateAll(data.slug);
  redirect("/admin/pilotos");
}

export async function updateDriver(id, formData) {
  await requireAdmin();
  const data = readFields(formData);
  const imageUrl = await saveUploadedImage(formData.get("image"), "drivers");
  if (imageUrl) data.imageUrl = imageUrl;
  await prisma.driver.update({ where: { id }, data });
  revalidateAll(data.slug);
  redirect("/admin/pilotos");
}

export async function deleteDriver(id, slug) {
  await requireAdmin();
  await prisma.driver.delete({ where: { id } });
  revalidateAll(slug);
  redirect("/admin/pilotos");
}
