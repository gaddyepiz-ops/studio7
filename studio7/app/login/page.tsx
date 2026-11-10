"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage("");

    if (mode === "signup") {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setMessage(error.message);
      } else if (data.session) {
        router.push("/dashboard");
      } else {
        setMessage("Account created. Check your email to confirm it, then sign in.");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setMessage(error.message);
      } else {
        router.push("/dashboard");
      }
    }

    setBusy(false);
  }

  return (
    <main className="mx-auto max-w-sm px-6 py-20">
      <Link href="/" className="text-sm text-neutral-500 hover:underline">
        ← Back to home
      </Link>
      <h1 className="mt-6 text-3xl font-bold">
        {mode === "signin" ? "Log in" : "Create account"}
      </h1>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-neutral-300 px-4 py-3 outline-none focus:border-neutral-900"
        />
        <input
          type="password"
          required
          minLength={6}
          placeholder="Password (6+ characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-neutral-300 px-4 py-3 outline-none focus:border-neutral-900"
        />
        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-full bg-neutral-900 px-6 py-3 font-medium text-white transition hover:bg-neutral-700 disabled:opacity-50"
        >
          {busy ? "Please wait..." : mode === "signin" ? "Log in" : "Sign up"}
        </button>
      </form>

      {message && <p className="mt-4 text-sm text-neutral-700">{message}</p>}

      <button
        onClick={() => {
          setMode(mode === "signin" ? "signup" : "signin");
          setMessage("");
        }}
        className="mt-6 text-sm text-neutral-500 hover:underline"
      >
        {mode === "signin"
          ? "No account yet? Sign up"
          : "Already have an account? Log in"}
      </button>
    </main>
  );
}
