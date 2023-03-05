import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import styles from "../../../styles/NftGallery.module.css";
import { useRouter } from "next/router";

export default function NFTGallery() {
  const [nfts, setNfts] = useState();
  const router = useRouter();
  const { domain } = router.query;

  const [fetchMethod, setFetchMethod] = useState("connectedWallet");
  const [pageKey, setPageKey] = useState(false);
  const [spamFilter, setSpamFilter] = useState(true);
  const [isLoading, setIsloading] = useState(false);
  const { address, isConnected } = useAccount();
  const [chain, setChain] = useState(process.env.NEXT_PUBLIC_ALCHEMY_NETWORK);

  const fetchNFTs = async (pagekey) => {
    setIsloading(true);
    setNfts();
    const endpoint = "/api/getNftsForOwner";
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify({
          address: address,
          pageKey: pagekey ? pagekey : null,
          chain: chain,
          excludeFilter: spamFilter,
        }),
      }).then((res) => res.json());
      setNfts(res.nfts);
      if (res.pageKey) {
        setPageKey(res.pageKey);
      } else {
        setPageKey();
      }
    } catch (e) {}

    setIsloading(false);
  };

  useEffect(() => {
    fetchNFTs();
  }, [spamFilter]);

  return (
    <div className={styles.nft_gallery_page}>
      <div>
        <button
          className="rounded-3xl text-center ml-4 btn border py-2 border-solid border-white btn-dark hvr-grow cursor-pointer"
          onClick={() => router.push(`/${domain}`)}
        >
          MyPage
        </button>
        <div className={styles.inputs_container}>
          <div className={styles.input_button_container}>
            <div className={styles.select_container_alt}>
              <select
                onChange={(e) => {
                  setChain(e.target.value);
                }}
                defaultValue={process.env.ALCHEMY_NETWORK}
              >
                <option value={"ETH_MAINNET"}>Mainnet</option>
                <option value={"MATIC_MAINNET"}>Polygon</option>
                <option value={"ETH_GOERLI"}>Goerli</option>
                <option value={"MATIC_MUMBAI"}>Mumbai</option>
              </select>
            </div>
            <div onClick={() => fetchNFTs()} className={styles.button_black}>
              <a>Search</a>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className={styles.loading_box}>
          <p>Loading...</p>
        </div>
      ) : (
        <div className={styles.nft_gallery}>
          {nfts?.length && fetchMethod != "collection" && (
            <div
              style={{
                display: "flex",
                gap: ".5rem",
                width: "100%",
                justifyContent: "end",
              }}
            >
              <p>Hide spam</p>
              <label className={styles.switch}>
                <input
                  onChange={(e) => setSpamFilter(e.target.checked)}
                  checked={spamFilter}
                  type="checkbox"
                />
                <span className={`${styles.slider} ${styles.round}`}></span>
              </label>
            </div>
          )}

          <div className={styles.nfts_display}>
            {nfts?.length ? (
              nfts.map((nft) => {
                return <NftCard key={nft.tokenId} nft={nft} />;
              })
            ) : (
              <div className={styles.loading_box}>
                <p>No NFTs found for the selected address</p>
              </div>
            )}
          </div>
        </div>
      )}

      {pageKey && nfts?.length && (
        <div>
          <a
            className={styles.button_black}
            onClick={() => {
              fetchNFTs(pageKey);
            }}
          >
            Load more
          </a>
        </div>
      )}
    </div>
  );
}
function NftCard({ nft }) {
  return (
    <div className={styles.card_container}>
      <div className={styles.image_container}>
        {nft.format == "mp4" ? (
          <video src={nft.media} controls>
            Your browser does not support the video tag.
          </video>
        ) : (
          <img src={nft.media}></img>
        )}
      </div>
      <div className={styles.info_container}>
        <div className={styles.title_container}>
          <h3>{nft.title}</h3>
        </div>
        <hr className={styles.separator} />
        <div className={styles.symbol_contract_container}>
          <div className={styles.symbol_container}>
            <p>{nft.symbol}</p>

            {nft.verified == "verified" ? (
              <img
                src={
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/2048px-Twitter_Verified_Badge.svg.png"
                }
                width="20px"
                height="20px"
              />
            ) : null}
          </div>
          <div className={styles.contract_container}>
            <p className={styles.contract_container}>
              {nft.contract.slice(0, 6)}...
              {nft.contract.slice(38)}
            </p>
            <img
              src={
                "https://etherscan.io/images/brandassets/etherscan-logo-circle.svg"
              }
              width="15px"
              height="15px"
            />
          </div>
        </div>

        <div className={styles.description_container}>
          <p>{nft.description}</p>
        </div>
      </div>
    </div>
  );
}
