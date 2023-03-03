import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/router";

export default function AuthForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { logUserIn } = useAuth();

  const handleValidSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setAuthError(null);
    const result = await logUserIn(email, password);
    setSubmitting(false);
    if (!result.success) {
      setAuthError(result.error.message);
    } else {
      console.log(result);
      router.push("/homepage");
    }
  };

  return (
    <>
      <div>
        <div>
          <div>
            <h2>Sign in with your Pinata account</h2>
            <p>
              Or{" "}
              <a
                href="https://app.pinata.cloud"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                sign up here.
              </a>
            </p>
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
}
