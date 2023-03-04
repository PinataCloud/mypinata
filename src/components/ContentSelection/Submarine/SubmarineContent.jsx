import { useContent } from "../../../hooks/useContent";
import { useState } from "react";
import { Unstable_Grid2, Box, Checkbox } from "@mui/material";
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
      <Unstable_Grid2 container rowGap={"1rem"}>
        {submarinedIDs?.length > 0 &&
          submarinedIDs.map((id) => {
            return (
              <Unstable_Grid2 key={id} xs={12} md={6} lg={4}>
                <Unstable_Grid2
                  container
                  sx={{ flexDirection: "column", alignItems: "flex-start" }}
                >
                  <Checkbox />
                  <iframe
                    src={`https://submarine-me.vercel.app/${id.short_id}`}
                    width="400px"
                    height="400px"
                  />
                </Unstable_Grid2>
              </Unstable_Grid2>
            );
          })}
      </Unstable_Grid2>
    </Unstable_Grid2>
  );
};

export default SubmarineContent;
