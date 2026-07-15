"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";

export function SetupForm() {
  const [installed, setInstalled] = useState<boolean | null>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch("/api/install.php", { credentials: "same-origin" })
      .then((response) => response.json())
      .then((data) => {
        setInstalled(Boolean(data.installed));
        if (!data.ok) setMessage(data.error ?? "Setup is unavailable.");
      })
      .catch(() => { setInstalled(false); setMessage("Configure api/config.php before running setup."); });
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/install.php", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          installToken: form.get("installToken"),
          username: form.get("username"),
          password: form.get("password"),
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Installation failed.");
      setInstalled(true);
      setMessage(data.message);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Installation failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="admin-shell admin-auth-shell">
      <section className="admin-auth-card">
        <div className="admin-brand"><span>A</span><strong>Amha Tours</strong></div>
        <p className="admin-kicker">One-time secure setup</p>
        <h1>{installed ? "Setup is locked" : "Connect the website database"}</h1>
        {installed ? (
          <>
            <p>The tables and administrator account already exist. The installer cannot run again.</p>
            <Link className="admin-primary" href="/admin">Go to the dashboard</Link>
          </>
        ) : (
          <form className="admin-form" onSubmit={submit}>
            <label>Installation token<input name="installToken" type="password" autoComplete="off" required /></label>
            <label>Administrator username<input name="username" defaultValue="amha" autoComplete="username" required /></label>
            <label>Initial password<input name="password" type="password" autoComplete="new-password" required minLength={7} /></label>
            <p className="admin-hint">Enter <code>amha123</code> for the requested initial login. You will be required to replace it after signing in.</p>
            <button className="admin-primary" type="submit" disabled={busy}>{busy ? "Installing..." : "Install and lock setup"}</button>
          </form>
        )}
        {message && <p className="admin-message" role="status">{message}</p>}
      </section>
    </main>
  );
}
