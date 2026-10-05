"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "../../lib/authGuard";
import { prisma } from "../../lib/db";

function revalidateAll() {
  revalidatePath("/");
  revalidatePath("/campeonatos");
  revalidatePath("/admin/campeonatos");
}

function readChampFields(formData) {
  return {
    code: String(formData.get("code") || "").trim().toUpperCase(),
    name: String(formData.get("name") || "").trim(),
    desc: String(formData.get("desc") || "").trim(),
    rounds: Number(formData.get("rounds") || 0),
    scope: String(formData.get("scope") || "").trim(),
  };
}

export async function createChampionship(formData) {
  await requireAdmin();
  await prisma.championship.create({ data: readChampFields(formData) });
  revalidateAll();
  redirect("/admin/campeonatos");
}

export async function updateChampionship(id, formData) {
  await requireAdmin();
  await prisma.championship.update({ where: { id }, data: readChampFields(formData) });
  revalidateAll();
  redirect("/admin/campeonatos");
}

export async function deleteChampionship(id) {
  await requireAdmin();
  await prisma.championship.delete({ where: { id } });
  revalidateAll();
  redirect("/admin/campeonatos");
}

function readStandingFields(formData) {
  return {
    champCode: String(formData.get("champCode") || "").trim().toUpperCase(),
    pos: Number(formData.get("pos") || 0),
    name: String(formData.get("name") || "").trim(),
    team: String(formData.get("team") || "").trim(),
    car: String(formData.get("car") || "").trim(),
    points: Number(formData.get("points") || 0),
  };
}

export async function createStanding(formData) {
  await requireAdmin();
  await prisma.standingEntry.create({ data: readStandingFields(formData) });
  revalidateAll();
  redirect("/admin/campeonatos");
}

export async function updateStanding(id, formData) {
  await requireAdmin();
  await prisma.standingEntry.update({ where: { id }, data: readStandingFields(formData) });
  revalidateAll();
  redirect("/admin/campeonatos");
}

export async function deleteStanding(id) {
  await requireAdmin();
  await prisma.standingEntry.delete({ where: { id } });
  revalidateAll();
  redirect("/admin/campeonatos");
}
