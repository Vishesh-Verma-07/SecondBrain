"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api";

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const password = String(fd.get("password"));
    if (password.length < 6)
      return setError("Use at least 6 characters for your password.");
    setLoading(true);
    setError("");
    try {
      await authApi.signup({
        username: String(fd.get("username")),
        email: String(fd.get("email")),
        password,
      });
      router.push("/login");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to create your account.",
      );
    } finally {
      setLoading(false);
    }
  }
  return (
    <main className="auth-page">
      <Link className="brand auth-brand" href="/">
        <i>✦</i> Brain Dock
      </Link>
      <section className="auth-card">
        <p className="section-label">START YOUR COLLECTION</p>
        <h1>
          A place for every
          <br />
          <em>good idea.</em>
        </h1>
        <p className="auth-lead">
          Create your personal knowledge space in seconds.
        </p>
        <form onSubmit={submit}>
          <label>
            Name
            <input required name="username" placeholder="Alex Morgan" />
          </label>
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
              placeholder="At least 6 characters"
            />
          </label>
          {error && <p className="form-error">{error}</p>}
          <button className="button auth-button" disabled={loading}>
            {loading ? "Creating account…" : "Create account"}
            <span>→</span>
          </button>
        </form>
        <p className="auth-switch">
          Already have an account? <Link href="/login">Sign in</Link>
        </p>
      </section>
    </main>
  );
}
