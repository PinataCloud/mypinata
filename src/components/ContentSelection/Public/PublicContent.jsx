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

const PublicContent = (domain) => {
  const [files, setFiles] = useState([]);
  // const [hashes, setHashes] = useState()
  const [checkedItems, setCheckedItems] = useState([]);
  const userDomain = domain.domain;
  const router = useRouter();
  const { getPublicContent, addPublicSelection, getPublicSelection } =
    useContent();

  const getContent = async () => {
    let data = await getPublicContent();
    data = data.files;
    let ipfshash = data.map((file) => file.ipfs_pin_hash);
    let selectedHashes = await getPublicSelection();
    selectedHashes = selectedHashes.userContent;
    const uniqueValues = ipfshash.filter(
      (hash) => !selectedHashes.includes(hash)
    );
    console.log(selectedHashes, ipfshash);

    setFiles(uniqueValues);
  };

  useEffect(() => {
    if (files.length === 0) {
      getContent();
    }
  }, [files]);

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
      router.push(`/${userDomain}`);
    }
  };

  return (
    <Unstable_Grid2>
      <Button onClick={handleAdd}>Add Files</Button>
      <Unstable_Grid2 container rowGap={"1rem"}>
        {files?.length > 0 &&
          files.map((file) => {
            return (
              <Unstable_Grid2>
                <Card>
                  <CardActionArea>
                    <CardActions>
                      <Checkbox
                        value={file}
                        onChange={(e) => handleCheckboxChange(e, file)}
                      />
                    </CardActions>
                  </CardActionArea>
                  <CardContent>
                    <Typography>{file}</Typography>
                  </CardContent>
                </Card>
              </Unstable_Grid2>
            );
          })}
      </Unstable_Grid2>
    </Unstable_Grid2>
  );
};

export default PublicContent;
