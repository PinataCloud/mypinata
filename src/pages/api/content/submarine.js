import { getPinataUserSession } from "../../../modules/pinataAPI.js";
import { getSubmarinedContent } from "../../../repositories/submarineme/content.js";
import { addSubmarineSelection } from "../../../repositories/mypinata/content.js";

export default async function handler(req, res) {
  const user = await getPinataUserSession(req);
  if (!user) {
    res.status(401).send("Unauthorized");
  }
  const pinataID = user.userInformation.id;

  if (req.method === "GET") {
    try {
      const submarinedContent = await getSubmarinedContent(pinataID);
      return res.status(200).json({ userContent: submarinedContent });
    } catch (error) {
      throw error;
    }
  }
}
