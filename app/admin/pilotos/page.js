import Link from "next/link";
import { requireAdmin } from "../../lib/authGuard";
import { prisma } from "../../lib/db";
import { deleteDriver } from "./actions";

export const metadata = { title: "Pilotos — Painel Drift Factory" };

export default async function AdminPilotosPage() {
  await requireAdmin();
  const drivers = await prisma.driver.findMany({ orderBy: { standing: "asc" } });

  return (
    <>
      <div className="admin-content-head">
        <div>
          <h1>Pilotos</h1>
          <p>{drivers.length} piloto(s) na grelha.</p>
        </div>
      </div>

      <div className="admin-toolbar">
        <Link href="/admin/pilotos/novo" className="btn btn-lime btn-sm">Novo piloto</Link>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>#</th><th>Nome</th><th>Equipa</th><th>Campeonato</th><th className="num">Posição</th><th></th></tr>
          </thead>
          <tbody>
            {drivers.map((d) => (
              <tr key={d.id}>
                <td>{d.num}</td>
                <td>{d.firstName} {d.lastName}</td>
                <td>{d.team}</td>
                <td>{d.champsCsv}</td>
                <td className="num">{d.standing}º</td>
                <td>
                  <div className="admin-table-actions">
                    <Link href={`/admin/pilotos/${d.id}/editar`} className="admin-link-btn">Editar</Link>
                    <form action={deleteDriver.bind(null, d.id, d.slug)}>
                      <button type="submit" className="admin-link-btn danger">Apagar</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {drivers.length === 0 && (
              <tr><td colSpan={6}>Ainda não há pilotos.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
