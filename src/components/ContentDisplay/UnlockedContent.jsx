import { Unstable_Grid2, Card, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import { useContent } from "../../hooks/useContent";
import { useRouter } from "next/router";

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
              <Card>
                <CardContent>
                  <iframe
                    src={`https://gateway.pinata.cloud/ipfs/${id}`}
                    height="400px"
                    width="400px"
                  ></iframe>
                </CardContent>
              </Card>
            </Unstable_Grid2>
          );
        })}
    </Unstable_Grid2>
  );
};

export default UnlockedContent;
