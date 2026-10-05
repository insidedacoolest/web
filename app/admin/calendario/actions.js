"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "../../lib/authGuard";
import { prisma } from "../../lib/db";

function revalidateAll() {
  revalidatePath("/");
  revalidatePath("/calendario");
  revalidatePath("/admin/calendario");
}

function readFields(formData) {
  const fullDateRaw = String(formData.get("fullDate") || "");
  const fullDate = fullDateRaw ? new Date(fullDateRaw) : new Date();
  const endDateRaw = String(formData.get("endDate") || "").trim();
  return {
    month: String(formData.get("month") || "").trim().toUpperCase(),
    day: String(formData.get("day") || "").trim(),
    fullDate,
    endDate: endDateRaw ? new Date(endDateRaw) : null,
    title: String(formData.get("title") || "").trim(),
    desc: String(formData.get("desc") || "").trim(),
    status: "scheduled",
  };
}

export async function createEvent(formData) {
  await requireAdmin();
  await prisma.calendarEvent.create({ data: readFields(formData) });
  revalidateAll();
  redirect("/admin/calendario");
}

export async function updateEvent(id, formData) {
  await requireAdmin();
  await prisma.calendarEvent.update({ where: { id }, data: readFields(formData) });
  revalidateAll();
  redirect("/admin/calendario");
}

export async function deleteEvent(id) {
  await requireAdmin();
  await prisma.calendarEvent.delete({ where: { id } });
  revalidateAll();
  redirect("/admin/calendario");
}
