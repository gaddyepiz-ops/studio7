"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Project = {
  id: number;
  title: string;
  status: string;
  profiles: { email: string } | null;
};

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("client");
  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  // Ask the database for projects. The database decides which rows we may see:
  // a client gets only their own, an admin gets everyone's.
  const loadProjects = useCallback(async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("id, title, status, profiles(email)")
      .order("id", { ascending: false });

    if (error) {
      setMessage(error.message);
    } else {
      setProjects((data ?? []) as unknown as Project[]);
    }
  }, []);

  useEffect(() => {
    async function start() {
      const { data } = await supabase.auth.getUser();

      // Not logged in? Send them to the login page.
      if (!data.user) {
        router.replace("/login");
        return;
      }

      setEmail(data.user.email ?? "");

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();

      setRole(profile?.role ?? "client");
      await loadProjects();
      setLoading(false);
    }

    start();
  }, [router, loadProjects]);

  async function addProject(e: FormEvent) {
    e.preventDefault();
    setMessage("");

    // We don't send a user_id. The database fills in who you are by itself.
    const { error } = await supabase.from("projects").insert({ title });

    if (error) {
      setMessage(error.message);
    } else {
      setTitle("");
      await loadProjects();
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    router.replace("/");
  }

  if (loading) {
    return <p className="p-10 text-neutral-500">Loading...</p>;
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="mt-1 text-sm text-neutral-500">
            {email} · {role}
          </p>
        </div>
        <button
          onClick={signOut}
          className="rounded-full border border-neutral-300 px-5 py-2 text-sm hover:border-neutral-900"
        >
          Sign out
        </button>
      </div>

      <h2 className="mt-12 text-xl font-semibold">
        {role === "admin" ? "All projects" : "Your projects"}
      </h2>

      <form onSubmit={addProject} className="mt-4 flex gap-3">
        <input
          required
          placeholder="New project name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 rounded-lg border border-neutral-300 px-4 py-3 outline-none focus:border-neutral-900"
        />
        <button
          type="submit"
          className="rounded-full bg-neutral-900 px-6 py-3 font-medium text-white hover:bg-neutral-700"
        >
          Add
        </button>
      </form>

      {message && <p className="mt-4 text-sm text-red-600">{message}</p>}

      <ul className="mt-6 space-y-3">
        {projects.length === 0 && (
          <li className="text-neutral-500">No projects yet.</li>
        )}
        {projects.map((project) => (
          <li
            key={project.id}
            className="rounded-xl border border-neutral-200 p-4"
          >
            <p className="font-medium">{project.title}</p>
            <p className="text-sm text-neutral-500">
              {project.status}
              {role === "admin" && project.profiles
                ? ` · ${project.profiles.email}`
                : ""}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
