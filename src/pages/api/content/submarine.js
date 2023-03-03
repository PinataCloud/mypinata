import { getPinataUserSession } from "../../../modules/pinataAPI.js";
import { getSubmarinedContent } from "../../../repositories/submarineme/content.js";

export default async function handler(req, res) {
  const user = await getPinataUserSession(req);
  if (!user) {
    res.status(401).send("Unauthorized");
  }
  if (req.method === "GET") {
    try {
      //get pinata id
      const pinataID = user.userInformation.id;
      const submarinedContent = await getSubmarinedContent(pinataID);
      console.log(submarinedContent);
      return res.status(200).json({ userContent: submarinedContent });
    } catch (error) {
      throw error;
    }
  }
}
