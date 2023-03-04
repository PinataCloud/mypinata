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
} from "@mui/material";
import { useEffect } from "react";
import { useContent } from "../../../hooks/useContent";

const PubilcContent = (domain) => {
  const [files, setFiles] = useState([]);
  const { getPublicContent } = useContent();
  const getContent = async () => {
    let data = await getPublicContent();
    setFiles(data.files.rows);
    console.log(data.files.rows);
  };

  useEffect(() => {
    if (files.length === 0) {
      getContent();
    }
  }, [files]);

  return (
    <Unstable_Grid2>
      <Unstable_Grid2 container rowGap={"1rem"}>
        {files?.length > 0 &&
          files.map((file) => {
            return (
              <Unstable_Grid2>
                <Card>
                  <CardActionArea>
                    <CardActions>
                      <Checkbox />
                    </CardActions>
                  </CardActionArea>
                  <CardContent>
                    <Typography>{file.metadata.name}</Typography>
                    <Typography>{file.ipfs_pin_hash}</Typography>
                  </CardContent>
                </Card>
              </Unstable_Grid2>
            );
          })}
      </Unstable_Grid2>
    </Unstable_Grid2>
  );
};

export default PubilcContent;
