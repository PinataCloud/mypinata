import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Typography, Unstable_Grid2 } from "@mui/material";
import Link from "next/link";
import SubmarineContent from "./SubmarineContent";

const ContentSelection = () => {
  const [mediaType, setMediaType] = useState("sub");

  const handleChange = (e) => {
    setMediaType(e.target.value);
  };

  return (
    <Unstable_Grid2 sx={{ padding: "2rem" }}>
      <Unstable_Grid2 container sx={{ justifyContent: "space-between" }}>
        <Box sx={{ width: "15rem" }}>
          <FormControl fullWidth>
            <InputLabel id="mediaType">Media Type</InputLabel>
            <Select
              labelId="mediaType"
              id="demo-simple-select"
              value={mediaType}
              label="Submarined Files"
              onChange={handleChange}
            >
              <MenuItem value={"sub"}>Unlockable Content</MenuItem>
              <MenuItem value={"public"}>Public Content</MenuItem>
              <MenuItem value={"nfts"}>NFTS</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Unstable_Grid2>
          <Link passHref href="/homepage">
            <Typography variant="h6">Add Files</Typography>
          </Link>
        </Unstable_Grid2>
      </Unstable_Grid2>
      <Unstable_Grid2>
        {mediaType === "sub" && <SubmarineContent />}
      </Unstable_Grid2>
    </Unstable_Grid2>
  );
};

export default ContentSelection;
