import SubmarineContent from "./Submarine/SubmarineContent";
import NFTGallery from "./NFT/NFTGallery";
import PublicContent from "./Public/PublicContent";
import { useState } from "react";

const ContentSelection = () => {
  const [mediaType, setMediaType] = useState("sub");

  return (
    <div className="p-3 w-full">
      <div className="flex px-6 content-select mb-3">
        <button
          onClick={() => setMediaType("public")}
          className="mr-6 text-2xl"
        >
          Public
        </button>
        <button
          onClick={() => setMediaType("sub")}
          className="mr-6 text-2xl"
          href=""
        >
          Private
        </button>
        <button
          onClick={() => setMediaType("nfts")}
          className="mr-6 text-2xl"
          href=""
        >
          NFTs
        </button>
        <button href="" className="mr-6 text-2xl">
          Merch
        </button>
      </div>
      <div className="p-3">
        {mediaType === "public" && <PublicContent />}
        {mediaType === "sub" && <SubmarineContent />}
        {mediaType === "nfts" && <NFTGallery />}
      </div>
    </div>
  );
};

export default ContentSelection;
