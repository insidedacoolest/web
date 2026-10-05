import { Anton, Barlow_Condensed, Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "../globals.css";
import { getSession } from "../lib/session";
import { logout } from "../actions/auth";
import AdminNav from "./AdminNav";

const fontDisplay = Anton({ variable: "--font-display", weight: "400", subsets: ["latin"] });
const fontHead = Barlow_Condensed({ variable: "--font-head", weight: ["500", "600", "700"], subsets: ["latin"] });
const fontBody = Inter({ variable: "--font-body", weight: ["400", "500", "600", "700", "800"], subsets: ["latin"] });

export const metadata = {
  title: "Painel — Drift Factory",
  description: "Painel de administração do site Drift Factory.",
  robots: { index: false, follow: false },
};

export default async function AdminRootLayout({ children }) {
  const session = await getSession();

  return (
    <html lang="pt" data-scroll-behavior="smooth" className={`${fontDisplay.variable} ${fontHead.variable} ${fontBody.variable}`}>
      <body>
        {!session?.userId ? (
          children
        ) : (
          <div className="admin-shell">
            <aside className="admin-sidebar">
              <div className="admin-sidebar-brand">
                <Image src="/img/logo-df-full.png" alt="Drift Factory" width={1200} height={239} className="admin-sidebar-logo" />
                <div className="admin-hint" style={{ marginTop: ".4rem" }}>Painel de administração</div>
              </div>
              <AdminNav />
              <div className="admin-sidebar-foot">
                <Link href="/" className="admin-view-site" target="_blank">Ver site ↗</Link>
                <form action={logout}>
                  <button type="submit" className="admin-logout-btn">Terminar sessão</button>
                </form>
              </div>
            </aside>
            <div className="admin-content">{children}</div>
          </div>
        )}
      </body>
    </html>
  );
}
