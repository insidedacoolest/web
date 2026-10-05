import Image from "next/image";
import Link from "next/link";
import LoginForm from "./LoginForm";

export const metadata = { title: "Entrar — Painel Drift Factory" };

export default function AdminLoginPage() {
  return (
    <div className="admin-auth-shell">
      <div className="admin-auth-card">
        <Link href="/" className="brand" style={{ justifyContent: "center", marginBottom: "1.6rem" }}>
          <Image src="/img/logo-df-full.png" alt="Drift Factory" width={1200} height={239} className="brand-logo" />
        </Link>
        <span className="eyebrow" style={{ justifyContent: "center", width: "100%" }}>Painel de administração</span>
        <h1 className="display h2" style={{ textAlign: "center", marginTop: ".5rem", marginBottom: "1.6rem" }}>Entrar</h1>
        <LoginForm />
      </div>
    </div>
  );
}
