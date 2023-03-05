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
    <div className="grid grid-cols-3 mt-6 gap-4 w-full">
      {submarineContent?.length > 0 &&
        submarineContent.map((id) => {
          return (
            <Unstable_Grid2 key={id}>
              <div className="content-card submarine-content-card">
                <a
                  className="btn border py-2 px-6 m-4 rounded-lg text-center"
                  href={`https://submarine-me.vercel.app/${id}`}
                  target="_blank"
                >
                  Unlock
                </a>
                <div
                  style={{
                    position: "relative",
                    padding: "1rem",
                    height: "100%",
                  }}
                >
                  <iframe
                    src={`https://submarine-me.vercel.app/${id}`}
                    width="100%"
                    height="100%"
                  />
                </div>
              </div>
            </Unstable_Grid2>
          );
        })}
    </div>
  );
};

export default LockedContent;
