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
  Typography,
  Button,
} from "@mui/material";
import { useEffect } from "react";
import { useRouter } from "next/router";

const SubmarineContent = (domain) => {
  const { getSubmarinedShortIds, addSubmarineSelection } = useContent();
  const [submarinedIDs, setSubmarineIDs] = useState();
  const [checkedItems, setCheckedItems] = useState([]);
  const userDomain = domain.domain;
  const router = useRouter();

  useEffect(() => {
    const getSubData = async () => {
      const ids = await getSubmarinedShortIds();
      setSubmarineIDs(ids.userContent);
    };
    getSubData();
  }, [checkedItems]);

  const handleCheckboxChange = (event, shortId) => {
    const checked = event.target.checked;
    if (checked) {
      setCheckedItems((prevState) => [...prevState, shortId]);
    } else {
      setCheckedItems((prevState) =>
        prevState.filter((item) => item !== shortId)
      );
    }
  };

  const handleAdd = async () => {
    console.log("Checked Items", typeof checkedItems);
    let result = await addSubmarineSelection(checkedItems);
    if (result.success) {
      setCheckedItems([]);
      router.push(`/${userDomain}`);
    }
  };

  //TO DO only display if not in the selection already
  return (
    <Unstable_Grid2 sx={{ textAlign: "right" }}>
      <Button onClick={handleAdd}>Add Files</Button>
      <Unstable_Grid2 container gap={"2rem"}>
        {submarinedIDs?.length > 0 &&
          submarinedIDs.map((id) => {
            return (
              <Unstable_Grid2 key={id.short_id}>
                <Card>
                  <CardActionArea>
                    <CardActions>
                      <Checkbox
                        value={id.short_id}
                        onChange={(e) => handleCheckboxChange(e, id.short_id)}
                      />
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
