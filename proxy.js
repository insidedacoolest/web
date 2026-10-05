import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "./app/lib/session";

const SOON_PATH = "/em-breve";

export default async function proxy(req) {
  const path = req.nextUrl.pathname;
  const isLoginRoute = path === "/admin/login";
  const isAdminSection = path.startsWith("/admin");
  const isAdminRoute = isAdminSection && !isLoginRoute;

  const cookie = (await cookies()).get("df_admin_session")?.value;
  const session = await decrypt(cookie);
  const isAdmin = Boolean(session?.userId);

  if (isAdminRoute && !isAdmin) {
    return NextResponse.redirect(new URL("/admin/login", req.nextUrl));
  }

  if (isLoginRoute && isAdmin) {
    return NextResponse.redirect(new URL("/admin", req.nextUrl));
  }

  // "Coming soon" gate for the public site. Logged-in admins can still
  // browse the real pages (to preview content before launch); everyone
  // else is transparently served the coming-soon page instead.
  if (!isAdminSection && path !== SOON_PATH && !isAdmin) {
    return NextResponse.rewrite(new URL(SOON_PATH, req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  // Skip Next internals and any request for a static asset file (by
  // extension) — covers /img, /uploads, favicon.ico, etc. generically so
  // new public/ folders don't need to be added here one by one.
  matcher: [
    "/((?!_next/static|_next/image|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|css|js|map|txt|xml|woff|woff2)$).*)",
  ],
};
