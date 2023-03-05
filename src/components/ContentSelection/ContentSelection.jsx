import { useState } from "react";
import Link from "next/link";

import SubmarineContent from "./Submarine/SubmarineContent";
import NFTGallery from "./NFT/NFTGallery";
import PubilcContent from "./Public/PublicContent";

const ContentSelection = () => {
  const [mediaType, setMediaType] = useState("sub");

  const handleChange = (e) => {
    setMediaType(e.target.value);
  };

  return (
    <div className="p-3 w-full">
      {/* Tabs */}
      <div className="flex px-6 content-select">
        <a className="mr-6">All</a>
        <a className="mr-6" href="">Public</a>
        <a className="mr-6" href="">Private</a>
        <a className="mr-6"href="">NFTs</a>
        <a href="">Merch</a>
      </div>
    </div>
  );
};

export default ContentSelection;

{/* <div className="flex justify-between pb-7 px-8 pt-4">
      <div className="flex">
        <img className="h-9 mr-2" src="/cloud.png"/>
        {!isAuthenticated && <h4 className="ff">MyPinataCloud</h4>}
      </div>

      <div className="flex">
        {isAuthenticated && <ConnectButton accountStatus="address"
                  chainStatus="icon"
                  showBalance={false} ></ConnectButton>}
        {isAuthenticated ? <button
              className="rounded-3xl text-center ml-4 btn border py-2 border-solid border-white btn-dark hvr-grow cursor-pointer"
              onClick={logUserOut}>
              Logout
            </button> :
            <button className="rounded-3xl text-center mr-4 btn border py-2 border-solid border-white btn-dark hvr-grow cursor-pointer" onClick={handleLogin}>Log In</button>} 
        {!isAuthenticated && <button
            className="rounded-3xl text-center btn border py-2 border-solid border-white btn-light hvr-grow cursor-pointer"
          >
            Sign Up
          </button>
        }
      </div>
    </div> */}
