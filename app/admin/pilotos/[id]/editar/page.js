import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "../../../../lib/authGuard";
import { prisma } from "../../../../lib/db";
import DriverForm from "../../DriverForm";
import { updateDriver, deleteDriver } from "../../actions";

export const metadata = { title: "Editar piloto — Painel Drift Factory" };

export default async function EditarPilotoPage({ params }) {
  await requireAdmin();
  const { id } = await params;
  const driver = await prisma.driver.findUnique({ where: { id: Number(id) } });
  if (!driver) notFound();

  const updateWithId = updateDriver.bind(null, driver.id);
  const deleteWithId = deleteDriver.bind(null, driver.id, driver.slug);

  return (
    <>
      <div className="admin-content-head">
        <div>
          <h1>Editar piloto</h1>
          <p><Link href="/admin/pilotos">← Voltar aos pilotos</Link> · <Link href={`/pilotos/${driver.slug}`} target="_blank">Ver perfil ↗</Link></p>
        </div>
      </div>
      <DriverForm action={updateWithId} initial={driver} submitLabel="Guardar alterações" />

      <div className="admin-subsection">
        <h3 className="info-panel-title">Zona de perigo</h3>
        <form action={deleteWithId}>
          <button type="submit" className="admin-link-btn danger">Apagar este piloto</button>
        </form>
      </div>
    </>
  );
}
