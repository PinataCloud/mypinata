import { Button, Typography, Unstable_Grid2 } from "@mui/material";
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
      sx={{ justifyContent: "space-between", padding: "2rem 4rem 0.8rem 4rem" }}
    >
      <Typography variant="h4">MyPinata</Typography>
      {isAuthenticated ? (
        <Unstable_Grid2 container gap={"1em"}>
          <ConnectButton></ConnectButton>
          <Button onClick={logUserOut}>Logout</Button>
        </Unstable_Grid2>
      ) : (
        <Button onClick={handleLogin}>Login</Button>
      )}
    </Unstable_Grid2>
  );
}
