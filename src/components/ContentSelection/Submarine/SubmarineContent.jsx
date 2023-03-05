import { useContent } from "../../../hooks/useContent";
import { useState } from "react";
import {
  Unstable_Grid2,
  Checkbox,
  CardContent,
  CardActionArea,
  CardActions
} from "@mui/material";
import { useEffect } from "react";
import { useRouter } from "next/router";

const SubmarineContent = () => {
  const {
    getSubmarinedShortIds,
    addSubmarineSelection,
    getSubmarineSelection,
  } = useContent();
  const [submarinedIDs, setSubmarineIDs] = useState();
  const [checkedItems, setCheckedItems] = useState([]);
  const router = useRouter();
  const { domain } = router.query;

  useEffect(() => {
    if (domain) {
      const getSubData = async () => {
        let ids = await getSubmarinedShortIds();
        ids = ids.userContent;
        let alreadySelected = await getSubmarineSelection(domain);
        alreadySelected = alreadySelected.userContent;
        const uniqueValues = ids.filter(
          (subId) => !alreadySelected.includes(subId)
        );
        setSubmarineIDs(uniqueValues);
      };
      getSubData();
    }
  }, [checkedItems, domain]);

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
      router.push(`/${domain}`);
    }
  };

  

  return (
    <Unstable_Grid2>
      <button
        className="rounded-3xl text-center ml-4 btn border py-2 border-solid border-white btn-dark hvr-grow cursor-pointer"
        onClick={handleAdd}
      >
        Add Files
      </button>
      <Unstable_Grid2
        container
        gap={"2rem"}
        sx={{ marginTop: "1rem", padding: "1rem" }}
      >
        {submarinedIDs?.length > 0 &&
          submarinedIDs.map((id) => {
            return (
              <Unstable_Grid2 key={id}>
                <div className="content-card min-h-min submarine-content-card">
                  <CardActionArea>
                    <CardActions>
                      <Checkbox
                        value={id}
                        onChange={(e) => handleCheckboxChange(e, id)}
                        className="checkbox"
                      />
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
    </Unstable_Grid2>
  );
};

export default SubmarineContent;
