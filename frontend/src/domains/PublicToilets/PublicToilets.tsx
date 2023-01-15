import React from "react";
import { Box, Rating, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { Template } from "../../common/Template/Template";
import { useFetch } from "../../hooks/useFetch";
import { BASE_URL, ROUTES } from "../../constants";
import { PublicToiletType } from "../../types/PublicToilet";
import { publicToiletsStyles } from "./styles";

export const PublicToilets = () => {
  const navigation = useNavigate();
  const goToPublicToilet = (id: number) => {
    navigation(ROUTES.PUBLIC_TOILET.replace(":id", id.toString()), {
      replace: true,
    });
  };
  const { response, loading } = useFetch<PublicToiletType[]>(
    `${BASE_URL}/public-toilets`
  );

  return (
    <Template>
      <Grid item xs={12} md={6}>
        {!loading &&
          response?.map((publicToilet) => {
            return (
              <Box
                sx={publicToiletsStyles.box}
                key={publicToilet.id}
                onClick={() => goToPublicToilet(publicToilet.id)}
              >
                <Typography>{publicToilet.name}</Typography>
                <Rating
                  sx={publicToiletsStyles.rate}
                  value={publicToilet.rate}
                  size="small"
                />
              </Box>
            );
          })}
      </Grid>
    </Template>
  );
};
