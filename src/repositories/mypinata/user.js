import { getSupabaseClient } from "./supabaseClient";

const supabase = getSupabaseClient();

export const getUserDomain = async (pinataId) => {
  const { data, error } = await supabase
    .from("User")
    .select("domain")
    .eq("pinata_id", pinataId);
  if (error) {
    console.log(error);
    throw "Couldn't find domain";
  }
  return data;
};

export const checkDomainExists = async (domain) => {
  const { data, error } = await supabase
    .from("User")
    .select("domain")
    .eq("domain", domain);

  if (error) {
    console.error("Error checking domain:", error.message);
    return false;
  }

  if (data && data.length > 0) {
    console.log("Domain exists:", data[0].domain);
    return true;
  } else {
    console.log("Domain does not exist");
    return false;
  }
};

export const checkUserExists = async (pinataId) => {
  const { data, error } = await supabase
    .from("User")
    .select("pinata_id")
    .eq("pinata_id", pinataId);

  if (error) {
    console.error("Error checking user:", error.message);
    return false;
  }

  if (data && data.length > 0) {
    console.log("User exists:", data[0].pinata_id);
    return true;
  } else {
    console.log("User does not exist");
    return false;
  }
};

export const addUser = async (pinataId, domain) => {
  const userExists = await checkUserExists(pinataId);
  if (!userExists) {
    try {
      const { data, error } = await supabase
        .from("User")
        .insert([{ pinata_id: pinataId, domain: domain }]);
      return data;
    } catch (error) {
      throw error;
    }
  }
};

export const addUserDomain = async (pinataId, domain) => {
  const domainExists = await checkDomainExists(domain);
  if (!domainExists) {
    try {
      const data = await addUser(pinataId, domain);
      return { success: true };
    } catch (error) {
      throw error;
    }
  }
};
