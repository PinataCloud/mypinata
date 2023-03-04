import { getPinataUserSession } from "../../modules/pinataAPI.js";
import { getUserDomain } from "../../repositories/mypinata/user.js";

export default async function handler(req, res) {
  const user = await getPinataUserSession(req);
  const domain = req.body;
  if (!user) {
    res.status(401).send("Unauthorized");
  }
  const pinataID = user.userInformation.id;
  if (req.method === "POST") {
    try {
      const data = await getUserDomain(pinataID).catch(() =>
        res.status(400).json({ message: "trouble finding user" })
      );
      if (data[0].domain === domain) {
        res.status(200).json({ isOwner: true });
      } else {
        res.status(200).json({ isOwner: false });
      }
    } catch (error) {
      throw error;
    }
  }
}
