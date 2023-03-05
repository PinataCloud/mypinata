import { getPinataUserSession } from "../../../modules/pinataAPI.js";
import {
  addPublicSelection,
  getPublicSelection,
} from "../../../repositories/mypinata/content.js";

export default async function handler(req, res) {
  const user = await getPinataUserSession(req);
  if (!user) {
    res.status(401).send("Unauthorized");
  }
  const pinataID = user.userInformation.id;
  if (req.method === "GET") {
    try {
      const publicSelection = await getPublicSelection(pinataID);
      return res.status(200).json({ userContent: publicSelection });
    } catch (error) {
      throw error;
    }
  }

  if (req.method === "POST") {
    try {
      const data = await addPublicSelection(pinataID, req.body);
      return res.status(200).json({ success: true, data: data });
    } catch (error) {
      throw error;
    }
  }
}
