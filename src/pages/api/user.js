import { getPinataUserSession } from "../../modules/pinataAPI.js";
import { checkUserExists } from "../../repositories/mypinata/user.js";

export default async function handler(req, res) {
  // console.log("USER API");
  const user = await getPinataUserSession(req);
  if (!user) {
    res.status(401).send("Unauthorized");
  }
  const pinataID = user.userInformation.id;
  if (req.method === "GET") {
    try {
      const isUser = await checkUserExists(pinataID).catch(() => {
        return res
          .status(400)
          .json({ message: "Something went wrong fetching user. mah >_<" });
      });
      if (userDomain.length > 1) {
        return res
          .status(200)
          .json({ hasDomain: true, userDomain: userDomain });
      } else {
        return res.status(200).json({ hasDomain: false });
      }
    } catch (error) {
      throw error;
    }
  }
}
