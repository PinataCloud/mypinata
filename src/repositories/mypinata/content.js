import { getSupabaseClient } from "./supabaseClient";

const supabase = getSupabaseClient();

export const getSubmarineSelection = async (pinataId) => {
  const { data, error } = await supabase
    .from("User")
    .select("submarine")
    .eq("pinata_id", pinataId);
  if (error) {
    console.log(error);
    throw "Couldn't find submarine content";
  }
  return data[0].submarine;
};

export const addSubmarineSelection = async (pinataId, content) => {
  const selectedContent = Object.values(content);
  console.log(selectedContent);
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

  console.log(
    `Added ${selectedContent} to column "my_column" in row with pinata_id ${pinataId}`
  );
};

export const addPublicSelection = async (pinataId, selectedContent) => {
  console.log(Array.isArray(selectedContent));
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

  const updatedValues = [...existingValues, ...selectedArray];
  const { data: newData, error: newError } = await supabase
    .from("User")
    .update({ public: updatedValues })
    .eq("pinata_id", pinataId);

  if (newError) {
    console.error(newError);
    return;
  }

  console.log(
    `Added ${selectedContent} to column "my_column" in row with pinata_id ${pinataId}`
  );
};

export const addNFTSelection = async (pinataId, selectedContent) => {
  const selectedArray = [selectedContent];
  console.log(selectedArray);
  const { data, error } = await supabase
    .from("User")
    .select("nfts")
    .eq("pinata_id", pinataId);

  if (error) {
    console.error(error);
    return;
  }

  let existingValues = data[0].nfts;
  if (existingValues === null) {
    existingValues = [];
  }

  const updatedValues = [...existingValues, ...selectedArray];
  const { data: newData, error: newError } = await supabase
    .from("User")
    .update({ nfts: updatedValues })
    .eq("pinata_id", pinataId);

  if (newError) {
    console.error(newError);
    return;
  }

  console.log(
    `Added ${selectedContent} to column "my_column" in row with pinata_id ${pinataId}`
  );
};
