import React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants";
import { styles } from "./styles";

export const Header = () => {
  return (
    <Box sx={styles.box}>
      <Link to={ROUTES.HOME}>Home</Link>
      <Link to={ROUTES.REGISTRATION}>Registration</Link>
    </Box>
  );
};
