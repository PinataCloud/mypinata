import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/router";

export default function Navbar() {
  const { isAuthenticated, logUserOut } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    router.push("/auth");
  };
  return (
    <div>
      {!isAuthenticated && <h4 className="ff">MyPinata</h4>}
      {isAuthenticated ? (
        <div>
          <ConnectButton></ConnectButton>
          <button onClick={logUserOut}>Logout</button>
        </div>
      ) : (
        <div
          className="rounded-3xl text-center border py-2 border-solid border-white btn-dark hvr-grow cursor-pointer"
          onClick={handleLogin}
        >
          Log In
        </div>
      )}
    </div>
  );
}
