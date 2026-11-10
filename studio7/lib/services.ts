import { cacheLife } from "next/cache";
import { supabase } from "@/lib/supabase";

export type Service = {
  id: number;
  title: string;
  description: string;
  price: string;
};

// Asks the database for every service, oldest first.
// "use cache" remembers the answer for about a minute, so the site stays fast
// and doesn't hit the database on every single visit.
export async function getServices(): Promise<Service[]> {
  "use cache";
  cacheLife("minutes");

  const { data } = await supabase.from("services").select("*").order("id");
  return data ?? [];
}
