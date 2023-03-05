import { Link } from "@mui/material";
import { useEffect, useState } from "react";
import MainLayout from "../components/Layout/MainLayout";
import { useContent } from "../hooks/useContent";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/router";
import LockedContent from "../components/ContentDisplay/LockedContent";
import UnlockedContent from "../components/ContentDisplay/UnlockedContent";

const Domain = () => {
  const [mediaType, setMediaType] = useState("all");
  const { isDomainOwner } = useContent();
  const [domainOwner, setDomainOwner] = useState(false);
  const [domain, setDomain] = useState();
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const isOwner = async () => {
    const data = await isDomainOwner(domain);
    if (data?.isOwner) {
      setDomainOwner(true);
    }
    return data;
  };

  useEffect(() => {
    if (router.isReady) {
      setDomain(router.query.domain);
    }
    isOwner();
  }, [router.isReady, domain]);

  return (
    <MainLayout>
      <div className="relative h-[75vh]">
        {isAuthenticated && domainOwner && (
          <Link
            className="add-item-link"
            passHref
            href={`/selectcontent?domain=${domain}`}
          >
            <img className="add-item-btn hvr-grow" src="./cloud-btn.png" />
          </Link>
        )}
        <div className="p-3 w-full">
          <div className="flex justify-between px-6 content-select mb-3">
            <div>
              <button
                onClick={() => setMediaType("all")}
                className="mr-6 text-2xl"
              >
                All
              </button>
              <button
                onClick={() => setMediaType("locked")}
                className="mr-6 text-2xl"
                href=""
              >
                Locked
              </button>
              <button
                onClick={() => setMediaType("unlocked")}
                className="mr-6 text-2xl"
                href=""
              >
                Unlocked
              </button>
            </div>

            <div>
              <a
                href={`https://lenster.xyz/?text=Check%20out%20${domain}%20on%20MyPinataCloud!&url=https://mypinata.vercel.app/${domain}&via=MyPinataCloud&hashtags=lens,myPinata`}
                target="_blank"
              >
                <button className="rounded-full btn">🌿</button>
              </a>
            </div>
          </div>

          <div className="p-3">
            {mediaType === "all" && (
              <>
                <UnlockedContent />
                <LockedContent />
              </>
            )}

            {mediaType === "locked" && <LockedContent />}
            {mediaType === "unlocked" && <UnlockedContent />}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Domain;
