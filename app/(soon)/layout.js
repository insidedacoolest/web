import { Anton, Barlow_Condensed, Inter } from "next/font/google";
import "../globals.css";

const fontDisplay = Anton({ variable: "--font-display", weight: "400", subsets: ["latin"] });
const fontHead = Barlow_Condensed({ variable: "--font-head", weight: ["500", "600", "700"], subsets: ["latin"] });
const fontBody = Inter({ variable: "--font-body", weight: ["400", "500", "600", "700", "800"], subsets: ["latin"] });

export const metadata = {
  title: "Drift Factory — Em breve",
  description: "Tudo sobre o drift em Portugal e no resto da Europa. Chegamos em breve.",
  robots: { index: false, follow: false },
};

export default function SoonLayout({ children }) {
  return (
    <html lang="pt" className={`${fontDisplay.variable} ${fontHead.variable} ${fontBody.variable}`}>
      <body>
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
