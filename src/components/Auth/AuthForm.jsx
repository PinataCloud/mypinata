import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/router";
import { useContent } from "../../hooks/useContent";

const AuthForm = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { getUserDomain } = useContent();

  const { logUserIn } = useAuth();

  const checkHasDomain = async () => {
    let data = await getUserDomain();
    return data;
  };

  const handleValidSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setAuthError(null);
    const result = await logUserIn(email, password);
    setSubmitting(false);
    if (!result.success) {
      setAuthError(result.error.message);
    } else {
      const data = await checkHasDomain();
      console.log(data);

      if (data.hasDomain) {
        router.push(`/${data.userDomain.domain}`);
      } else {
        router.push("/domain");
      }
    }
  };

  return (
    <>
      <div>
        <div>
          <div>
            <h2>Sign in with your Pinata account</h2>
          </div>
          <form onSubmit={handleValidSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button type="submit">
                <span></span>
                {submitting ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
