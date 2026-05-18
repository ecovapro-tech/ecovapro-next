"use client";
import { useState } from "react";

export default function AdminLogin() {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      const r = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw }),
      });
      if (!r.ok) {
        const d = await r.json().catch(() => ({}));
        throw new Error(d.error ?? "Login failed.");
      }
      const next = new URLSearchParams(window.location.search).get("next") || "/admin";
      window.location.href = next;
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Login failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <form onSubmit={submit} className="bg-white w-full max-w-sm rounded-2xl shadow-sm p-8 border border-gray-200">
        <div className="font-black text-green tracking-widest mb-6 text-center">ECOVAPRO · CRM</div>
        <label htmlFor="pw" className="block text-sm font-medium text-gray-700 mb-1">Admin password</label>
        <input
          id="pw"
          type="password"
          autoFocus
          required
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-green"
        />
        {err && <div className="mt-3 text-sm text-red-700">{err}</div>}
        <button
          type="submit"
          disabled={busy || !pw}
          className={`mt-5 w-full py-3 rounded-lg font-bold ${busy || !pw ? "bg-gray-300 text-white/70" : "bg-green text-white hover:bg-green-deep"}`}
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
