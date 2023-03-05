import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/router";
import Search from "./Search";

export default function Navbar() {
  const { isAuthenticated, logUserOut } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    router.push("/auth");
  };

  return (
    <div className="flex justify-between pb-4 px-8 pt-4">
      <div className="flex">
        <img className="h-9 mr-2" src="/cloud.png"/>
        <h4 className="ff">MyPinataCloud</h4>
      </div>

      <div className="flex">
        {isAuthenticated && (
          <ConnectButton
            accountStatus="address"
            chainStatus="icon"
            showBalance={false}
          ></ConnectButton>
        )}
        <div className="flex">
          {isAuthenticated ? (
            <button
              className="h-12 rounded-3xl text-center ml-4 btn border py-2 border-solid border-white btn-dark hvr-grow cursor-pointer"
              onClick={logUserOut}
            >
              Logout
            </button>
          ) : (
            <button
              className="h-12 rounded-3xl text-center mr-4 btn border py-2 border-solid border-white btn-dark hvr-grow cursor-pointer"
              onClick={handleLogin}
            >
              Log In
            </button>
          )}
          {!isAuthenticated && (
            <button className=" h-12 rounded-3xl text-center btn border py-2 border-solid border-white btn-light hvr-grow cursor-pointer mr-4">
              <a href="https://www.pinata.cloud/">Sign Up</a>
            </button>
          )}
          <div>
            <Search />
          </div>
        </div>
      </div>
    </div>
  );
}
