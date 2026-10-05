"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "../../../lib/authGuard";
import { prisma } from "../../../lib/db";

function revalidateAll() {
  revalidatePath("/drift-virtual");
  revalidatePath("/admin/drift-virtual/calendario");
}

function parseLocalDate(raw) {
  const [y, m, d] = String(raw || "").split("-").map(Number);
  if (!y || !m || !d) return new Date();
  return new Date(y, m - 1, d);
}

function readFields(formData) {
  return {
    date: parseLocalDate(formData.get("date")),
    label: String(formData.get("label") || "").trim(),
    location: String(formData.get("location") || "").trim(),
    style: String(formData.get("style") || "fill"),
  };
}

export async function createCalendarEntry(formData) {
  await requireAdmin();
  await prisma.virtualCalendarEvent.create({ data: readFields(formData) });
  revalidateAll();
  redirect("/admin/drift-virtual/calendario");
}

export async function updateCalendarEntry(id, formData) {
  await requireAdmin();
  await prisma.virtualCalendarEvent.update({ where: { id }, data: readFields(formData) });
  revalidateAll();
  redirect("/admin/drift-virtual/calendario");
}

export async function deleteCalendarEntry(id) {
  await requireAdmin();
  await prisma.virtualCalendarEvent.delete({ where: { id } });
  revalidateAll();
  redirect("/admin/drift-virtual/calendario");
}
