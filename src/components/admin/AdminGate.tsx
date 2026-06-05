"use client";

import { useEffect, useState } from "react";
import Spinner from "../Spinner";

const STORAGE_KEY = "mp_admin_ok";

/**
 * Password gate wrapper for the admin dashboard.
 * On success we remember the session in sessionStorage so reloads don't
 * re-prompt during a single browser session.
 */
export default function AdminGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setAuthed(sessionStorage.getItem(STORAGE_KEY) === "1");
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        sessionStorage.setItem(STORAGE_KEY, "1");
        setAuthed(true);
      } else {
        setError(data.error || "Incorrect password.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Initial check still running
  if (authed === null) {
    return (
      <div className="flex justify-center py-32">
        <Spinner />
      </div>
    );
  }

  if (authed) {
    return <>{children}</>;
  }

  return (
    <div className="container-px flex min-h-[60vh] items-center justify-center py-16">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-ink/10 bg-white p-6 shadow-card"
      >
        <h1 className="font-serif text-2xl font-700 text-ink">Admin Access</h1>
        <p className="mt-1 text-sm text-ink/60">
          Enter the admin password to continue.
        </p>

        <input
          type="password"
          className="input-field mt-5"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          required
        />

        {error && (
          <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <button type="submit" disabled={loading} className="btn-gold mt-5 w-full">
          {loading ? <Spinner className="h-4 w-4" /> : "Enter"}
        </button>
      </form>
    </div>
  );
}
