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
    <Unstable_Grid2 container>
      {publicContent?.length > 0 &&
        publicContent.map((id) => {
          return (
            <Unstable_Grid2 key={id}>
              <div className="content-card min-h-min user-dashboard-card">
                <CardContent>
                  <Image
                    src={`https://gateway.pinata.cloud/ipfs/${id}`}
                    className="content-iframe"
                    width="auto"
                    height="550px"
                  ></Image>
                </CardContent>
              </div>
            </Unstable_Grid2>
          );
        })}
    </Unstable_Grid2>
  );
};

export default UnlockedContent;
