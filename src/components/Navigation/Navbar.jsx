import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/router";
import ContentSelection from "../ContentSelection/ContentSelection";
import { Button } from "../Auth/AuthButtons";

export default function Navbar() {
  const { isAuthenticated, logUserOut } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    router.push("/auth");
  };
  return (
      <section className="flex justify-between pt-4">
        <h4>test</h4>
      </section>
  );
}
