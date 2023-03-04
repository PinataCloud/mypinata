import {
  getPinataUserSession,
  getPublicFiles,
} from "../../../modules/pinataAPI.js";

export default async function handler(req, res) {
  const user = await getPinataUserSession(req);
  if (!user) {
    res.status(401).send("Unauthorized");
  }
  if (req.method === "GET") {
    try {
      const jwt = req.headers.authorization;
      console.log(jwt);

      let files = await getPublicFiles(jwt).catch(() => {
        return res.status(400).json({ success: false });
      });
      return res.status(200).json({ success: true, files: files });
    } catch (error) {
      throw error;
    }
  }
}
