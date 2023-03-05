import { getPinataUserSession } from "../../../modules/pinataAPI.js";
import {
  addSubmarineSelection,
  getSubmarineSelection,
} from "../../../repositories/mypinata/content.js";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const domain = req.query.domain;

    try {
      const submarinedSelection = await getSubmarineSelection(domain);
      return res.status(200).json({ userContent: submarinedSelection });
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
      const data = await addSubmarineSelection(pinataID, req.body);
      return res.status(200).json({ success: true, data: data });
    } catch (error) {
      throw error;
    }
  }
}
