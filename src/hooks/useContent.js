import ky from "ky";
import { fetchSession } from "./useAuth";
import axios from "axios";

export const useContent = () => {
  const createSubmarineKey = async () => {
    const headers = await getHeaders();
    await ky(`${process.env.NEXT_PUBLIC_MANAGED_API}/auth/keys`, {
      method: "POST",
      headers: {
        ...headers,
      },
    });
  };

  const getUserPinataSession = async () => {
    try {
      const headers = await getHeaders();
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_PINATA_API_URL}/users/checkForSession`,
        {
          headers: {
            Authorization: headers.Authorization || "",
            source: headers.Source ? "login" : "",
          },
        }
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  const submarineKey = async () => {
    let key = await getSubmarineApiKey();
    if (key) {
      return key;
    }
    await createSubmarineKey();
    key = await getSubmarineApiKey();
    return key;
  };

  const getSubmarinedShortIds = async () => {
    try {
      const url = "/api/content/submarine";
      const headers = await getHeaders();
      const res = await ky(url, {
        method: "GET",
        headers: {
          ...headers,
        },
      });
      const json = await res.json();
      return json;
    } catch (error) {
      throw error;
    }
  };

  const getUserDomain = async () => {
    try {
      const url = "/api/domain";
      const headers = await getHeaders();
      const res = await ky(url, {
        method: "GET",
        headers: {
          ...headers,
        },
      });
      const json = await res.json();
      return json;
    } catch (error) {
      throw error;
    }
  };

  const addUserDomain = async (domain) => {
    try {
      const url = "/api/domain";
      const headers = await getHeaders();
      const res = await ky(url, {
        body: domain,
        method: "POST",
        headers: {
          ...headers,
        },
      });
      const json = await res.json();
      return json;
    } catch (error) {
      throw error;
    }
  };

  const getPublicContent = async () => {
    try {
      const url = "/api/content/public";
      const headers = await getHeaders();
      const res = await ky(url, {
        method: "GET",
        headers: {
          ...headers,
        },
      });
      const json = await res.json();
      return json;
    } catch (error) {
      throw error;
    }
  };
  const getHeaders = async () => {
    const sessionData = await fetchSession();
    const { accessToken } = sessionData;
    return {
      Authorization: `Bearer ${accessToken}`,
      Source: "login",
    };
  };
  return {
    getHeaders,
    submarineKey,
    getUserPinataSession,
    getSubmarinedShortIds,
    getPublicContent,
    getUserDomain,
    addUserDomain,
  };
};
