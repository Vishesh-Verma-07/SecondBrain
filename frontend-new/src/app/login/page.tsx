"use client";
import Link from "next/link";
import { SubmitEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  async function submit(e: SubmitEvent<HTMLFormElement>) {
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
        <i>✦</i> Brain Dock
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
          {/* <label>
            Password
            <input
              required
              name="password"
              type="password"
              placeholder="*******"
            />
          </label> */}
          <label className="block">
            <span className="font-semibold">Password</span>
            <div className="relative mt-1 rounded-md border border-gray-300 focus-within:border-black focus-within:ring-1 focus-within:ring-black">
              <input
                required
                name="password"
                type={showPassword ? "text" : "password"}
                className="form-input"
                placeholder="*******"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-black"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </label>
          {error && <p className="form-error mb-2">{error}</p>}
          <button className="button auth-button" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
            <span>→</span>
          </button>
        </form>
        <p className="auth-switch mt-4">
          New to Brain Dock? <Link href="/signup">Create an account</Link>
        </p>
      </section>
    </main>
  );
}
