import { getSubmarinemeClient } from "./submarinemeClient";

const supabase = getSubmarinemeClient();

export const getSubmarinedContent = async (pinataId) => {
  const { data, error } = await supabase
    .from("Content")
    .select("short_id")
    .eq("pinata_user_id", pinataId);
  if (error) {
    throw "Couldn't find content";
  }
  return data;
};
