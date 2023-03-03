import { Typography, Unstable_Grid2, Button, Link } from "@mui/material";

const HomePage = () => {
  return (
    <Unstable_Grid2>
      <Link passHref href="/selectcontent">
        Add Files
      </Link>

      <h1>No content yet</h1>
    </Unstable_Grid2>
  );
};

export default HomePage;
