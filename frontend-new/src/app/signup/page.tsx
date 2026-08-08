"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api";
import { Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
          <label className="block">
            <span className="font-semibold">Password</span>
            <div className="relative mt-1 rounded-md border border-gray-300 focus-within:border-black focus-within:ring-1 focus-within:ring-black">
              <input
                required
                name="password"
                type={showPassword ? "text" : "password"}
                className="form-input"
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
          {error && <p className="form-error">{error}</p>}
          <button className="button auth-button" disabled={loading}>
            {loading ? "Creating account…" : "Create account"}
            <span>→</span>
          </button>
        </form>
        <p className="auth-switch mt-4">
          Already have an account? <Link href="/login">Sign in</Link>
        </p>
      </section>
    </main>
  );
}
