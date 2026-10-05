"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV } from "../lib/nav";
import { DICT } from "../lib/dict";
import { useCart } from "./CartContext";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header({ locale = "pt" }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalQty, setOpen } = useCart();
  const navDict = DICT.nav[locale] || DICT.nav.pt;

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <Link href="/" className="brand">
            <Image src="/img/logo-df-full.png" alt="Drift Factory" width={1200} height={239} className="brand-logo" priority />
          </Link>

          <nav className="main-nav" aria-label="Navegação principal">
            {NAV.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`nav-link${isActive(item.href) ? " active" : ""}`}
              >
                {navDict[item.id] || item.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <LanguageSwitcher current={locale} compact />
            <button className="cart-btn" type="button" onClick={() => setOpen(true)} aria-label="Abrir carrinho">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
              </svg>
              <span className="cart-count">{totalQty}</span>
            </button>
            <a className="ig-pill" href="https://www.instagram.com/_driftfactory" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.85.07 3.25.15 4.77 1.7 4.92 4.92.06 1.25.07 1.62.07 4.81s-.01 3.56-.07 4.81c-.15 3.2-1.66 4.77-4.92 4.92-1.25.06-1.62.07-4.85.07-3.2 0-3.6-.01-4.85-.07-3.26-.15-4.77-1.72-4.92-4.92-.06-1.25-.07-1.61-.07-4.81s.02-3.56.07-4.81c.15-3.22 1.66-4.77 4.92-4.92C8.4 2.2 8.8 2.2 12 2.2zm0 2.16c-3.14 0-3.51.01-4.75.07-2.34.1-3.29 1.07-3.4 3.4-.06 1.24-.07 1.61-.07 4.75s.01 3.51.07 4.75c.11 2.32 1.06 3.29 3.4 3.4 1.24.06 1.6.07 4.75.07s3.51-.01 4.75-.07c2.33-.11 3.29-1.07 3.4-3.4.06-1.24.07-1.6.07-4.75s-.01-3.51-.07-4.75c-.11-2.32-1.06-3.29-3.4-3.4-1.24-.06-1.61-.07-4.75-.07zm0 3.68a5.96 5.96 0 110 11.92 5.96 5.96 0 010-11.92zm0 2.16a3.8 3.8 0 100 7.6 3.8 3.8 0 000-7.6zm6.2-2.4a1.4 1.4 0 11-2.8 0 1.4 1.4 0 012.8 0z" /></svg>
              <span>@_driftfactory</span>
            </a>
            <button
              className={`burger${mobileOpen ? " open" : ""}`}
              aria-label="Abrir menu"
              aria-expanded={mobileOpen}
              aria-controls="mobileNav"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-nav${mobileOpen ? " open" : ""}`} id="mobileNav">
        {NAV.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`mnav-link${isActive(item.href) ? " active" : ""}`}
            onClick={() => setMobileOpen(false)}
          >
            {navDict[item.id] || item.label}
          </Link>
        ))}
        <a className="mnav-link mnav-ig" href="https://www.instagram.com/_driftfactory" target="_blank" rel="noopener noreferrer">
          Instagram @_driftfactory ↗
        </a>
      </div>
    </>
  );
}
