import { Unstable_Grid2, Card, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import { useContent } from "../../hooks/useContent";
import { useRouter } from "next/router";
const LockedContent = () => {
  const router = useRouter();
  const [submarineContent, setSubmarineContent] = useState([]);
  const { getSubmarineSelection } = useContent();
  const { domain } = router.query;

  useEffect(() => {
    if (domain) {
      getSubmarineContent();
    }
  }, [domain]);

  const getSubmarineContent = async () => {
    const data = await getSubmarineSelection(domain);
    setSubmarineContent(data.userContent);
  };
  return (
    <Unstable_Grid2 container>
      {submarineContent?.length > 0 &&
        submarineContent.map((id) => {
          return (
            <Unstable_Grid2 key={id}>
              <Card>
                <CardContent>
                  <iframe
                    src={`https://submarine-me.vercel.app/${id}`}
                    width="400px"
                    height="600px"
                  />
                </CardContent>
              </Card>
            </Unstable_Grid2>
          );
        })}
    </Unstable_Grid2>
  );
};

export default LockedContent;
