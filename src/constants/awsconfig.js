export const awsconfig = {
  Auth: {
    region: "us-east-1",
    userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
    userPoolWebClientId: process.env.NEXT_PUBLIC_USER_POOL_WEB_CLIENT_ID,
    oauth: {
      domain: process.env.NEXT_PUBLIC_AWS_AUTH_URL,
      scope: ["email", "profile", "openid", "aws.cognito.signin.user.admin"],
      redirectSignIn: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}${process.env.NEXT_PUBLIC_LOGIN_REDIRECT}`,
      redirectSignOut: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}${process.env.NEXT_PUBLIC_SIGNOUT_REDIRECT}`,
      responseType: "code",
    },
  },
  API: {
    endpoints: [
      {
        name: "Pinata API",
        endpoint: process.env.NEXT_PUBLIC_PINATA_API_URL,
      },
    ],
  },
};
