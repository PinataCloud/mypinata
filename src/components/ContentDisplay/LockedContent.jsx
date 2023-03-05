import {
  Unstable_Grid2,
  Card,
  CardContent,
  CardActionArea,
  CardActions,
} from "@mui/material";
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
              <div className="content-card min-h-min user-dashboard-card">
              <Card>
                <CardActionArea>
                  <CardActions>
                    <a
                      className=""
                      href={`https://submarine-me.vercel.app/${id}`}
                      target="_blank"
                    >
                      Unlock
                    </a>
                  </CardActions>
                </CardActionArea>
                <CardContent>
                  <iframe
                    src={`https://submarine-me.vercel.app/${id}`}
                    className="content-iframe"
                  />
                </CardContent>
              </div>
            </Unstable_Grid2>
          );
        })}
    </Unstable_Grid2>
  );
};

export default LockedContent;
