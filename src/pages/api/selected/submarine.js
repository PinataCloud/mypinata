import { getPinataUserSession } from "../../../modules/pinataAPI.js";
import {
  addSubmarineSelection,
  getSubmarineSelection,
} from "../../../repositories/mypinata/content.js";

export default async function handler(req, res) {
  const user = await getPinataUserSession(req);
  if (!user) {
    res.status(401).send("Unauthorized");
  }
  const pinataID = user.userInformation.id;

  if (req.method === "GET") {
    try {
      const submarinedSelection = await getSubmarineSelection(pinataID);
      return res.status(200).json({ userContent: submarinedSelection });
    } catch (error) {
      throw error;
    }
  }

  if (req.method === "POST") {
    try {
      const data = await addSubmarineSelection(pinataID, req.body);
      return res.status(200).json({ success: true, data: data });
    } catch (error) {
      throw error;
    }
  }
}
