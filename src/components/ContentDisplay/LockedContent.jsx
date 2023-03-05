import { Unstable_Grid2, Card, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import { useContent } from "../../hooks/useContent";
const LockedContent = () => {
  const [submarineContent, setSubmarineContent] = useState([]);
  const { getSubmarineSelection } = useContent();

  useEffect(() => {
    getSubmarineContent();
  }, []);

  const getSubmarineContent = async () => {
    const data = await getSubmarineSelection();
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

export default LockedContent;
