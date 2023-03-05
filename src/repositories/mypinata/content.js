import { getSupabaseClient } from "./supabaseClient";

const supabase = getSupabaseClient();

export const getSubmarineSelection = async (pinataId) => {
  const { data, error } = await supabase
    .from("User")
    .select("submarine")
    .eq("pinata_id", pinataId);
  if (error) {
    throw error;
  }
  return data[0].submarine;
};

export const addSubmarineSelection = async (pinataId, content) => {
  const selectedContent = Object.values(content);
  const { data, error } = await supabase
    .from("User")
    .select("submarine")
    .eq("pinata_id", pinataId);
  if (error) {
    console.error(error);
    return;
  }
  let existingValues = data[0].submarine;
  if (existingValues === null) {
    existingValues = [];
  }
  const updatedValues = [...existingValues, ...selectedContent];
  const { data: newData, error: newError } = await supabase
    .from("User")
    .update({ submarine: updatedValues })
    .eq("pinata_id", pinataId);

  if (newError) {
    console.error(newError);
    return;
  }
};

export const getPublicSelection = async (pinataId) => {
  const { data, error } = await supabase
    .from("User")
    .select("public")
    .eq("pinata_id", pinataId);
  if (error) {
    console.log(error);
    throw error;
  }
  return data[0].public;
};

export const addPublicSelection = async (pinataId, content) => {
  const selectedContent = Object.values(content);
  const { data, error } = await supabase
    .from("User")
    .select("public")
    .eq("pinata_id", pinataId);
  if (error) {
    console.error(error);
    return;
  }
  let existingValues = data[0].public;
  if (existingValues === null) {
    existingValues = [];
  }
  const updatedValues = [...existingValues, ...selectedContent];
  const { data: newData, error: newError } = await supabase
    .from("User")
    .update({ public: updatedValues })
    .eq("pinata_id", pinataId);

  if (newError) {
    console.error(newError);
    return;
  }
};
