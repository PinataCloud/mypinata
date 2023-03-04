import { useState, useEffect } from "react";
import { Auth, Hub } from "aws-amplify";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export const fetchSession = async () => {
  try {
    const session = await Auth.currentSession();
    const user = await Auth.currentAuthenticatedUser();

    const { idToken, accessToken, refreshToken } = session;
    return {
      user,
      session,
      accessToken: accessToken.jwtToken,
      refreshToken: refreshToken.token,
      idToken: idToken.jwtToken,
    };
  } catch (error) {
    console.log(error);
    if (
      window.location.pathname !== "/" &&
      !window.location.pathname.includes("auth")
    ) {
      window.location.replace("/");
    }
    return null;
  }
};

export const logUserOut = async () => {
  clearCognitoCache();
  await Auth.signOut({ global: true });
  window.location.replace("/");
};

export const clearCognitoCache = () => {
  const cookies = Cookies.get();
  const cookieKeys = Object.keys(cookies);
  const filteredCookies = cookieKeys.filter((c) =>
    c.includes("CognitoIdentityServiceProvider")
  );
  for (const c of filteredCookies) {
    Cookies.remove(c, { path: "/", domain: ".app.pinata.cloud" });
    Cookies.remove(c, { path: "/", domain: ".pinata.cloud" });
    console.log("removed");
  }
};
// const getHeaders = async () => {
//   const sessionData = await fetchSession();
//   const { accessToken } = sessionData;
//   return {
//     Authorization: `Bearer ${accessToken}`,
//     Source: "login",
//   };
// };

// export const checkForUser = async () => {
//   try {
//     const url = "/api/user";
//     const headers = await getHeaders();
//     const res = await ky(url, {
//       method: "GET",
//       headers: {
//         ...headers,
//       },
//     });
//     const json = await res.json();
//     console.log("checkuserlong", json);
//     if (json) {
//       return true;
//     } else {
//       return false;
//     }
//   } catch (error) {
//     return false;
//   }
// };

export const logUserIn = async (email, password) => {
  try {
    localStorage.removeItem("pinata-avatar");
    const res = await Auth.signIn(email, password);
    const user = await Auth.userSession(res);
    // const userExists = await checkForUser();
    // if (userExists) {
    //   console.log(userExists, "user exisits");
    // }
    return {
      success: true,
      user: res,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error,
    };
  }
};

export const signUpUser = async (
  email,
  password,
  firstName,
  lastName,
  isBuilder
) => {
  try {
    const { user } = await Auth.signUp({
      username: email,
      password,
      attributes: {
        email,
        "custom:firstName": firstName,
        "custom:lastName": lastName,
        "custom:userType": isBuilder ? "builder" : "creator",
      },
    });
    return {
      success: true,
      user,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      user: null,
      error,
    };
  }
};

export const confirmSignUp = async (email, password, code) => {
  try {
    await Auth.confirmSignUp(email, code);
    await logUserIn(email, password);
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error,
    };
  }
};

export const resendConfirmationCode = async (email) => {
  try {
    await Auth.resendSignUp(email);
    return {
      success: true,
    };
  } catch (error) {
    console.log("error resending code: ", error);
    return {
      success: false,
      error,
    };
  }
};

export const sendPasswordReset = async (email) => {
  try {
    await Auth.forgotPassword(email);
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

export const forgotPasswordSubmit = async (email, code, newPassword) => {
  try {
    await Auth.forgotPasswordSubmit(email, code, newPassword);
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

export const changePassword = async (oldPassword, newPassword) => {
  try {
    const session = await fetchSession();
    return await Auth.changePassword(session.user, oldPassword, newPassword);
  } catch (error) {
    throw error;
  }
};

// export const setupTotp = async () => {
//   const session = await fetchSession();
//   return await Auth.setupTOTP(session.user);
// };

// export const verifytTotp = async (challengeAnswer) => {
//   try {
//     const session = await fetchSession();
//     await Auth.verifyTotpToken(session.user, challengeAnswer);
//     return await setPreferredMFA();
//   } catch (error) {
//     throw error;
//   }
// };

// export const updateAttributes = async (attributes) => {
//   try {
//     const session = await fetchSession();
//     const user = session.user;
//     await Auth.updateUserAttributes(user, attributes);
//   } catch (error) {
//     throw error;
//   }
// };

export const getAuthenticatedUser = async () => {
  return await Auth.currentAuthenticatedUser();
};

export const useAuth = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedInUser, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const [idToken, setIdToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  useEffect(() => {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          const { signInUserSession } = data;
          Auth.currentAuthenticatedUser().then((user) => {
            setUser(user);
            setIsAuthenticated(true);
            setAccessToken(signInUserSession.accessToken);
            setRefreshToken(signInUserSession.refreshToken);
            setIdToken(signInUserSession.idToken);
          });
          break;
        case "signOut":
          console.log("sign out");
          setUser(null);
          setIsAuthenticated(false);
          break;
        case "signUp":
          console.log("sign up");

          break;
        default:
          return;
      }
    });
    handleSession();
  }, []);

  const handleSession = async () => {
    const sessionData = await fetchSession();
    if (sessionData && sessionData.user && sessionData.session) {
      setUser(sessionData.user);
      setIsAuthenticated(true);
      setAccessToken(sessionData.accessToken);
      setRefreshToken(sessionData.refreshToken);
      setIdToken(sessionData.idToken);
    }
  };

  return {
    isAuthenticated,
    loggedInUser,
    signUpUser,
    confirmSignUp,
    resendConfirmationCode,
    sendPasswordReset,
    forgotPasswordSubmit,
    logUserIn,
    logUserOut,
    fetchSession,
    changePassword,
    // setupTotp,
    // verifytTotp,
    accessToken,
    idToken,
    refreshToken,
    // updateAttributes,
    getAuthenticatedUser,
    clearCognitoCache,
  };
};
