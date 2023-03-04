import { Typography, Unstable_Grid2, Button, Link } from "@mui/material";
import MainLayout from "../components/Layout/MainLayout";

const HomePage = () => {
  return (
    <MainLayout>
      <Unstable_Grid2>
        <Link passHref href="/selectcontent">
          Add Files
        </Link>

        <h1>No content yet</h1>
      </Unstable_Grid2>
    </MainLayout>
  );
};

export default HomePage;
