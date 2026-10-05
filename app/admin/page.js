import Link from "next/link";
import { requireAdmin } from "../lib/authGuard";
import { prisma } from "../lib/db";

export const metadata = { title: "Resumo — Painel Drift Factory" };

export default async function AdminHomePage() {
  const session = await requireAdmin();

  const [news, drivers, products, orders, championships, rounds, events, leaderboard, gridWorks, partners] = await Promise.all([
    prisma.newsArticle.count(),
    prisma.driver.count(),
    prisma.product.count(),
    prisma.order.count(),
    prisma.championship.count(),
    prisma.resultRound.count(),
    prisma.calendarEvent.count(),
    prisma.leaderboardEntry.count(),
    prisma.gridWorksInquiry.count(),
    prisma.partner.count(),
  ]);

  const cards = [
    { label: "Notícias", count: news, href: "/admin/noticias" },
    { label: "Pilotos", count: drivers, href: "/admin/pilotos" },
    { label: "Produtos na loja", count: products, href: "/admin/loja" },
    { label: "Encomendas", count: orders, href: "/admin/encomendas" },
    { label: "Campeonatos", count: championships, href: "/admin/campeonatos" },
    { label: "Rondas de resultados", count: rounds, href: "/admin/resultados" },
    { label: "Eventos no calendário", count: events, href: "/admin/calendario" },
    { label: "Entradas no leaderboard", count: leaderboard, href: "/admin/drift-virtual" },
    { label: "Pedidos Grid Works", count: gridWorks, href: "/admin/grid-works" },
    { label: "Parceiros", count: partners, href: "/admin/parceiros" },
  ];

  return (
    <>
      <div className="admin-content-head">
        <div>
          <h1>Bem-vindo</h1>
          <p>Sessão iniciada como {session.email}. Escolhe uma secção para editar o conteúdo do site.</p>
        </div>
      </div>

      <div className="admin-stat-grid">
        {cards.map((c) => (
          <Link href={c.href} className="admin-stat-card" key={c.href}>
            <b>{c.count}</b>
            <span>{c.label}</span>
          </Link>
        ))}
      </div>
    </>
  );
}
