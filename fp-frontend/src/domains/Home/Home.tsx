import React from "react";
import { Template } from "../../common/Template/Template";
import { Paper, Box } from "@mui/material";
import { ROUTES } from "../../constants";
import { useNavigate } from "react-router-dom";
import { styles } from "./styles";

export const Home = () => {
  const navigation = useNavigate();

  const navigateTo = (url: string) => {
    navigation(url, { replace: true });
  };
  return (
    <Template>
      <Box sx={styles.box}>
        <Paper
          elevation={2}
          sx={styles.paper}
          onClick={() => navigateTo(ROUTES.ADD_PUBLIC_TOILET)}
        >
          dodaj nowa toalete publiczną
        </Paper>
        <Paper
          elevation={2}
          sx={styles.paper}
          onClick={() => navigateTo(ROUTES.PUBLIC_TOILETS)}
        >
          przeglądnij publiczne toalety
        </Paper>
      </Box>
    </Template>
  );
};
