export const awsauth = {
  domain: process.env.NEXT_PUBLIC_AWS_AUTH_URL,
  scope: ["email", "profile", "openid", "aws.cognito.signin.user.admin"],
  redirectSignIn: process.env.NEXT_PUBLIC_LOGIN_REDIRECT,
  redirectSignOut: process.env.NEXT_PUBLIC_SIGNOUT_REDIRECT,
  responseType: "code",
};
