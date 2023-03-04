import { useContent } from "../../../hooks/useContent";
import { useState } from "react";
import {
  Unstable_Grid2,
  Box,
  Checkbox,
  Card,
  CardContent,
  CardActionArea,
  CardActions,
} from "@mui/material";
import { useEffect } from "react";

const SubmarineContent = () => {
  const { getSubmarinedShortIds } = useContent();
  const [submarinedIDs, setSubmarineIDs] = useState();
  const [selectedContet, setSelectedContet] = useState([]);

  useEffect(() => {
    const getSubData = async () => {
      const ids = await getSubmarinedShortIds();
      setSubmarineIDs(ids.userContent);
    };
    getSubData();
  }, []);

  return (
    <Unstable_Grid2>
      <Unstable_Grid2 container gap={"2rem"}>
        {submarinedIDs?.length > 0 &&
          submarinedIDs.map((id) => {
            return (
              <Unstable_Grid2 key={id}>
                <Card>
                  <CardActionArea>
                    <CardActions>
                      <Checkbox />
                    </CardActions>
                  </CardActionArea>
                  <CardContent>
                    <iframe
                      src={`https://submarine-me.vercel.app/${id.short_id}`}
                      width="100%"
                      height="100%"
                    />
                  </CardContent>
                </Card>
              </Unstable_Grid2>
            );
          })}
      </Unstable_Grid2>
    </Unstable_Grid2>
  );
};

export default SubmarineContent;
