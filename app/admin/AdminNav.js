"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/admin", label: "Resumo", exact: true },
  { href: "/admin/noticias", label: "Notícias" },
  { href: "/admin/pilotos", label: "Pilotos" },
  { href: "/admin/loja", label: "Loja" },
  { href: "/admin/encomendas", label: "Encomendas" },
  { href: "/admin/campeonatos", label: "Campeonatos" },
  { href: "/admin/resultados", label: "Resultados" },
  { href: "/admin/calendario", label: "Calendário" },
  { href: "/admin/drift-virtual", label: "Drift Virtual" },
  { href: "/admin/grid-works", label: "Grid Works" },
  { href: "/admin/banners", label: "Banners" },
  { href: "/admin/parceiros", label: "Parceiros" },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="admin-nav">
      {LINKS.map((link) => {
        const active = link.exact ? pathname === link.href : pathname.startsWith(link.href);
        return (
          <Link key={link.href} href={link.href} className={active ? "active" : ""}>
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
