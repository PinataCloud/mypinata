import { getPinataUserSession } from "../../../modules/pinataAPI.js";
import {
  addPublicSelection,
  getPublicSelection,
} from "../../../repositories/mypinata/content.js";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const domain = req.query.domain;
    try {
      const publicSelection = await getPublicSelection(domain);
      return res.status(200).json({ userContent: publicSelection });
    } catch (error) {
      throw error;
    }
  }

  if (req.method === "POST") {
    const user = await getPinataUserSession(req);
    if (!user) {
      res.status(401).send("Unauthorized");
    }
    const pinataID = user.userInformation.id;
    try {
      const data = await addPublicSelection(pinataID, req.body);
      return res.status(200).json({ success: true, data: data });
    } catch (error) {
      throw error;
    }
  }
}
