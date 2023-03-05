import { useContent } from "../../../hooks/useContent";
import { useState } from "react";
import {
  Unstable_Grid2,
  Checkbox,
  Card,
  CardContent,
  CardActionArea,
  CardActions,
  Button,
} from "@mui/material";
import { useEffect } from "react";
import { useRouter } from "next/router";

const SubmarineContent = (domain) => {
  const {
    getSubmarinedShortIds,
    addSubmarineSelection,
    getSubmarineSelection,
  } = useContent();
  const [submarinedIDs, setSubmarineIDs] = useState();
  const [checkedItems, setCheckedItems] = useState([]);
  const userDomain = domain.domain;
  const router = useRouter();

  useEffect(() => {
    const getSubData = async () => {
      let ids = await getSubmarinedShortIds();
      ids = ids.userContent;
      let alreadySelected = await getSubmarineSelection();
      alreadySelected = alreadySelected.userContent;
      const uniqueValues = ids.filter(
        (subId) => !alreadySelected.includes(subId)
      );
      setSubmarineIDs(uniqueValues);
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
    let result = await addSubmarineSelection(checkedItems);
    if (result.success) {
      setCheckedItems([]);
      router.push(`/${userDomain}`);
    }
  };

  return (
    <Unstable_Grid2 sx={{ textAlign: "right" }}>
      <Button onClick={handleAdd}>Add Files</Button>
      <Unstable_Grid2 container gap={"2rem"}>
        {submarinedIDs?.length > 0 &&
          submarinedIDs.map((id) => {
            return (
              <Unstable_Grid2 key={id}>
                <Card>
                  <CardActionArea>
                    <CardActions>
                      <Checkbox
                        value={id}
                        onChange={(e) => handleCheckboxChange(e, id)}
                      />
                    </CardActions>
                  </CardActionArea>
                  <CardContent>
                    <iframe
                      src={`https://submarine-me.vercel.app/${id}`}
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
