"use server";

import { prisma } from "../lib/db";

export async function submitGridWorksInquiry(data) {
  const name = String(data.name || "").trim();
  const email = String(data.email || "").trim();
  const team = String(data.team || "").trim();
  const service = String(data.service || "").trim();
  const message = String(data.message || "").trim();

  if (!name || !email || !message) {
    return { error: "Preenche o nome, email e mensagem." };
  }

  const inquiry = await prisma.gridWorksInquiry.create({
    data: { name, email, team, service, message },
  });

  return { success: true, id: inquiry.id };
}
