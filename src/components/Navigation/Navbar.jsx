import { Unstable_Grid2 } from "@mui/material";
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
    <Unstable_Grid2
      container
      sx={{ justifyContent: "space-between", padding: "1rem 0" }}
    >
      {!isAuthenticated && <h4 className="ff">MyPinata</h4>}
      {isAuthenticated ? (
        <Unstable_Grid2 container gap={"1em"}>
          <ConnectButton></ConnectButton>
          <Button onClick={logUserOut}>Logout</Button>
        </Unstable_Grid2>
      ) : (
        <div
        className="rounded-3xl text-center border py-2 border-solid border-white btn-dark hvr-grow cursor-pointer"
        onClick={handleLogin}>
          Log In
        </div>
      )}
    </Unstable_Grid2>
  );
}
