import { Anton, Barlow_Condensed, Inter } from "next/font/google";
import "../globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTop";
import CartDrawer from "../components/CartDrawer";
import { CartProvider } from "../components/CartContext";
import { getLocale } from "../lib/i18n";

const fontDisplay = Anton({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

const fontHead = Barlow_Condensed({
  variable: "--font-head",
  weight: ["500", "600", "700"],
  subsets: ["latin"],
});

const fontBody = Inter({
  variable: "--font-body",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Drift Factory — Notícias, campeonatos e resultados de drift em Portugal",
  description:
    "Tudo sobre o drift em Portugal e no resto da Europa — notícias, campeonatos, pilotos, resultados, calendário, loja e drift virtual.",
};

export default async function RootLayout({ children }) {
  const locale = await getLocale();
  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${fontDisplay.variable} ${fontHead.variable} ${fontBody.variable}`}
    >
      <body>
        <CartProvider>
          <div className="grain" aria-hidden="true" />
          <a href="#main" className="skip-link">Saltar para o conteúdo</a>
          <Header locale={locale} />
          <main id="main">{children}</main>
          <Footer locale={locale} />
          <BackToTop />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
