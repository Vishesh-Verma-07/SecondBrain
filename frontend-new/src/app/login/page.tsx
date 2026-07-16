"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    try {
      await authApi.signin({
        email: String(fd.get("email")),
        password: String(fd.get("password")),
      });
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <main className="auth-page">
      <Link className="brand auth-brand" href="/">
        <i>✦</i> second brain
      </Link>
      <section className="auth-card">
        <p className="section-label">WELCOME BACK</p>
        <h1>
          Pick up where
          <br />
          <em>you left off.</em>
        </h1>
        <p className="auth-lead">Your saved ideas are waiting for you.</p>
        <form onSubmit={submit}>
          <label>
            Email
            <input
              required
              name="email"
              type="email"
              placeholder="you@example.com"
            />
          </label>
          <label>
            Password
            <input
              required
              name="password"
              type="password"
              placeholder="••••••••"
            />
          </label>
          {error && <p className="form-error">{error}</p>}
          <button className="button auth-button" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
            <span>→</span>
          </button>
        </form>
        <p className="auth-switch">
          New to Second Brain? <Link href="/signup">Create an account</Link>
        </p>
      </section>
    </main>
  );
}
