import axios from "axios";

export const getPinataUserSession = async (req) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_PINATA_API_URL}/users/checkForSession`,
      {
        headers: {
          Authorization: req.headers.authorization || "",
          source: req.headers.source ? "login" : "",
        },
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
