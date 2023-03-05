import { Unstable_Grid2, Card, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import { useContent } from "../../hooks/useContent";

const UnlockedContent = () => {
  const [publicContent, setPublicContent] = useState([]);
  const { getPublicSelection } = useContent();

  useEffect(() => {
    getPublicContent();
  }, []);

  const getPublicContent = async () => {
    const data = await getPublicSelection();
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
                    src={`https://submarine-me.vercel.app/${id}`}
                    width="400px"
                    height="400px"
                  />
                </CardContent>
              </Card>
            </Unstable_Grid2>
          );
        })}
    </Unstable_Grid2>
  );
};

export default UnlockedContent;
