import { Unstable_Grid2, Card, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import { useContent } from "../../hooks/useContent";
import { useRouter } from "next/router";
import Image from "next/image";

const UnlockedContent = () => {
  const router = useRouter();
  const [publicContent, setPublicContent] = useState([]);
  const { getPublicSelection } = useContent();
  const { domain } = router.query;

  useEffect(() => {
    if (domain) {
      getPublicContent();
    }
  }, [domain]);

  const getPublicContent = async () => {
    const data = await getPublicSelection(domain);
    setPublicContent(data.userContent);
  };
  return (
    <div className="grid grid-cols-3 mt-6 gap-4 w-full">
      {publicContent?.length > 0 &&
        publicContent.map((id) => {
          return (
            <Unstable_Grid2 key={id}>
              <div className="content-card user-dashboard-card">
                <div
                  style={{
                    position: "relative",
                    padding: "1rem",
                    height: "100%",
                  }}
                >
                  <Image
                    src={`https://gateway.pinata.cloud/ipfs/${id}`}
                    fill
                    className="rounded"
                  ></Image>
                </div>
              </div>
            </Unstable_Grid2>
          );
        })}
    </div>
  );
};

export default UnlockedContent;
