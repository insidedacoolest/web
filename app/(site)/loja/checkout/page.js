import Link from "next/link";
import CheckoutForm from "../../../components/CheckoutForm";

export const metadata = { title: "Finalizar compra — Drift Factory" };

export default function CheckoutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Início</Link> / <Link href="/loja">Loja</Link> / Checkout</div>
          <span className="eyebrow">Última etapa</span>
          <h1 className="display h1">Finalizar compra</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <CheckoutForm />
        </div>
      </section>
    </>
  );
}
