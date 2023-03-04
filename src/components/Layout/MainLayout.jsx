import { Unstable_Grid2 } from "@mui/material";
import Navbar from "../Navigation/Navbar";
export default function MainLayout({ children }) {
  return (
    <Unstable_Grid2>
      <Navbar />
      {children}
    </Unstable_Grid2>
  );
}
