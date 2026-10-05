"use server";

import { prisma } from "../lib/db";

export async function createOrder(data) {
  const name = String(data?.name || "").trim();
  const email = String(data?.email || "").trim();
  const phone = String(data?.phone || "").trim();
  const address = String(data?.address || "").trim();
  const notes = String(data?.notes || "").trim();
  const items = Array.isArray(data?.items) ? data.items : [];

  if (!name || !email || !phone || !address) {
    return { error: "Preenche nome, email, telefone e morada." };
  }
  if (items.length === 0) {
    return { error: "O carrinho está vazio." };
  }

  const total = items.reduce((sum, i) => sum + Number(i.price) * Number(i.qty), 0);

  const order = await prisma.order.create({
    data: {
      name,
      email,
      phone,
      address,
      notes,
      total,
      items: {
        create: items.map((i) => ({
          productName: String(i.name || "Produto"),
          size: i.size ? String(i.size) : null,
          price: Number(i.price) || 0,
          qty: Number(i.qty) || 1,
        })),
      },
    },
  });

  return { success: true, orderId: order.id };
}
