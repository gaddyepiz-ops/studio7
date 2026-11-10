import { createClient } from "@supabase/supabase-js";

// One shared connection to your Supabase project.
// The URL and key come from environment variables, not from the code.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
