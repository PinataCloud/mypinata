import { getPinataUserSession } from "../../modules/pinataAPI.js";
import {
  addUserDomain,
  getUserDomain,
} from "../../repositories/mypinata/user.js";

export default async function handler(req, res) {
  const user = await getPinataUserSession(req);
  console.log("Domain.js", user);
  if (!user) {
    res.status(401).send("Unauthorized");
  }
  const pinataID = user.userInformation.id;
  if (req.method === "GET") {
    try {
      const userDomain = await getUserDomain(pinataID).catch(() => {
        return res
          .status(400)
          .json({ message: "Something went wrong fetching user. mah >_<" });
      });
      if (userDomain.length > 0) {
        return res
          .status(200)
          .json({ hasDomain: true, userDomain: userDomain[0] });
      } else {
        console.log(userDomain.length);
        return res.status(200).json({ hasDomain: false });
      }
    } catch (error) {
      throw error;
    }
  }
  if (req.method === "POST") {
    try {
      const data = await addUserDomain(pinataID, req.body);
      if (data.success) {
        return res.status(200).json({ success: true });
      }
    } catch (error) {
      throw error;
    }
  }
}
