import { Unstable_Grid2 } from "@mui/material";
const AuthLayout = ({ children }) => {
  return (
    <Unstable_Grid2 sx={{ padding: "2rem 4rem 0.8rem 3rem", margin: "2em" }}>
      {children}
    </Unstable_Grid2>
  );
};

export default AuthLayout;
