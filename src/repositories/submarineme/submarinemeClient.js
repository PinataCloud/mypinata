import { createClient } from "@supabase/supabase-js";

export const getSubmarinemeClient = () => {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUBME_SUPABASE_URL ||
    "https://ahpenkqovrmaazdqhzub.supabase.co";
  const supabaseKey = process.env.NEXT_PUBLIC_SUBME_SUPABASE_KEY || "";
  let client = createClient(supabaseUrl, supabaseKey);
  return client;
};
