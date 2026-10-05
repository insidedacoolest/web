"use client";

import { useActionState } from "react";
import { login } from "../../actions/auth";

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <form action={action} className="admin-auth-form">
      <label className="admin-field">
        <span>Email</span>
        <input type="email" name="email" required autoComplete="username" placeholder="admin@driftfactory.pt" />
      </label>
      <label className="admin-field">
        <span>Palavra-passe</span>
        <input type="password" name="password" required autoComplete="current-password" placeholder="••••••••" />
      </label>
      {state?.error && <p className="admin-error">{state.error}</p>}
      <button type="submit" className="btn btn-lime btn-block" disabled={pending}>
        {pending ? "A entrar…" : "Entrar"}
      </button>
    </form>
  );
}
