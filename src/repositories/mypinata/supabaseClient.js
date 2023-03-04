import { createClient } from "@supabase/supabase-js";

export const getSupabaseClient = () => {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://spgfzxbfjespqhfgtovf.supabase.co";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || "";
  let client = createClient(supabaseUrl, supabaseKey);
  return client;
};
