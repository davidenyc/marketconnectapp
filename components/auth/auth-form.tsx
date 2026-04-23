"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { validateEmail, validatePassword } from "@/lib/validation";

export function AuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const supabase = createSupabaseBrowserClient();

    if (!supabase) {
      setMessage("Supabase env vars are not configured yet. Add them to enable vendor sign-up and login.");
      return;
    }

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password, mode);
    const nextErrors: Record<string, string> = {};

    if (emailError) {
      nextErrors.email = emailError;
    }

    if (passwordError) {
      nextErrors.password = passwordError;
    }

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      setMessage("Please fix the highlighted fields.");
      return;
    }

    setLoading(true);
    setMessage(null);
    setFieldErrors({});

    const result =
      mode === "signup"
        ? await supabase.auth.signUp({
            email,
            password,
            options: {
              emailRedirectTo:
                typeof window !== "undefined"
                  ? `${window.location.origin}/auth/callback?next=/dashboard`
                  : undefined
            }
          })
        : await supabase.auth.signInWithPassword({ email, password });

    if (result.error) {
      setMessage(result.error.message);
    } else {
      setMessage(
        mode === "signup"
          ? "Account created. Check your email if confirmation is enabled, then continue to the dashboard."
          : "Signed in. Redirecting to your dashboard..."
      );

      if (mode === "login") {
        router.push("/dashboard");
        router.refresh();
      }
    }

    setLoading(false);
  }

  return (
    <section className="mx-auto max-w-md rounded-[2rem] border border-clay bg-[#fffaf0] p-5 shadow-soft">
      <div className="flex rounded-full bg-mist p-1">
        <button
          type="button"
          onClick={() => setMode("login")}
          className={`flex-1 rounded-full px-4 py-3 text-sm font-semibold ${mode === "login" ? "bg-white text-ink shadow" : "text-ink/60"}`}
        >
          Log in
        </button>
        <button
          type="button"
          onClick={() => setMode("signup")}
          className={`flex-1 rounded-full px-4 py-3 text-sm font-semibold ${mode === "signup" ? "bg-white text-ink shadow" : "text-ink/60"}`}
        >
          Sign up
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-ink">Email</span>
          <input
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setFieldErrors((current) => {
                const next = { ...current };
                delete next.email;
                return next;
              });
            }}
            className={`w-full rounded-2xl bg-white px-4 py-4 outline-none ring-0 transition focus:border-leaf ${fieldErrors.email ? "border border-red-400" : "border border-clay"}`}
            placeholder="vendor@example.com"
            required
          />
          {fieldErrors.email ? <span className="mt-2 block text-sm text-red-600">{fieldErrors.email}</span> : null}
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-ink">Password</span>
          <input
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setFieldErrors((current) => {
                const next = { ...current };
                delete next.password;
                return next;
              });
            }}
            className={`w-full rounded-2xl bg-white px-4 py-4 outline-none ring-0 transition focus:border-leaf ${fieldErrors.password ? "border border-red-400" : "border border-clay"}`}
            placeholder="Create a secure password"
            required
          />
          {fieldErrors.password ? <span className="mt-2 block text-sm text-red-600">{fieldErrors.password}</span> : null}
        </label>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-leaf px-5 py-4 text-base font-semibold text-white transition hover:bg-leaf/90 disabled:opacity-60"
        >
          {loading ? "Please wait..." : mode === "signup" ? "Create vendor account" : "Log in to dashboard"}
        </button>
      </form>

      {message ? <p className="mt-4 rounded-2xl bg-mist px-4 py-3 text-sm text-ink/75">{message}</p> : null}

      <p className="mt-4 text-sm text-ink/65">
        After authentication, vendors can manage their profile, update stock, and set today’s location from the{" "}
        <Link href="/dashboard" className="font-semibold text-leaf">
          dashboard
        </Link>
        .
      </p>
    </section>
  );
}
