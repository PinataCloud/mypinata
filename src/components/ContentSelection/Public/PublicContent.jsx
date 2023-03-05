import { useState } from "react";
import {
  Unstable_Grid2,
  Box,
  Checkbox,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CardActions,
  Button,
} from "@mui/material";
import { useEffect } from "react";
import { useContent } from "../../../hooks/useContent";
import { useRouter } from "next/router";

const PublicContent = () => {
  const [files, setFiles] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const { getPublicContent, addPublicSelection, getPublicSelection } =
    useContent();
  const router = useRouter();
  const { domain } = router.query;

  const getContent = async () => {
    let data = await getPublicContent();
    data = data.files;
    console.log(data);
    let allHashes = data.map((file) => file.ipfs_pin_hash);
    let selectedHashes = await getPublicSelection(domain);
    if (selectedHashes.userContent !== null) {
      selectedHashes = selectedHashes.userContent;
      const uniqueValues = allHashes.filter(
        (hash) => !selectedHashes.includes(hash)
      );
      setFiles(uniqueValues);
    } else {
      setFiles(allHashes);
    }
  };

  useEffect(() => {
    if (domain) {
      getContent();
    }
  }, [domain]);

  const handleCheckboxChange = (event, hash) => {
    const checked = event.target.checked;
    if (checked) {
      setCheckedItems((prevState) => [...prevState, hash]);
    } else {
      setCheckedItems((prevState) => prevState.filter((item) => item !== hash));
    }
  };

  const handleAdd = async () => {
    let result = await addPublicSelection(checkedItems);
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
        gap={"1rem"}
        sx={{ marginTop: "1rem", padding: "1rem" }}
      >
        {files?.length > 0 &&
          files.map((file) => {
            return (
              <Unstable_Grid2>
                <div className="content-card">
                  <CardActionArea>
                    <CardActions>
                      <Checkbox 
                        value={file}
                        onChange={(e) => handleCheckboxChange(e, file)}
                        className="checkbox"
                      />
                    </CardActions>
                  </CardActionArea>
                  <CardContent>
                    <Typography>{file}</Typography>
                  </CardContent>
                </div>
              </Unstable_Grid2>
            );
          })}
      </Unstable_Grid2>
    </Unstable_Grid2>
  );
};

export default PublicContent;
