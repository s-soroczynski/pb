import React, { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Box, Rating } from "@mui/material";
import { Marker, Popup } from "react-leaflet";

import { Template } from "../../common/Template/Template";
import { BASE_URL } from "../../constants";
import { useFetch } from "../../hooks/useFetch";
import { PublicToiletType } from "../../types/PublicToilet";
import { UserDetailsType } from "../../types/User";
import { fetchHelper } from "../../helpers";
import { publicToiletStyles } from "./styles";
import { LeafletMap } from "../../common/Map/LeafletMap";

export const PublicToilet = memo(() => {
  let { id } = useParams();
  const [user, setUser] = useState<UserDetailsType | null>(null);
  const { response: publicToilet, loading: publicToiletLoading } =
    useFetch<PublicToiletType>(`${BASE_URL}/public-toilets/${id}`);

  useEffect(() => {
    if (publicToilet?.user_id) {
      fetchHelper({ url: `${BASE_URL}/users/${publicToilet.user_id}` }).then(
        (userData: UserDetailsType) => {
          setUser(userData);
        }
      );
    }
  }, [publicToilet]);

  console.log(publicToilet);
  return !publicToiletLoading && publicToilet ? (
    <Template>
      <>
        <Typography variant="h2">PublicToilet: {publicToilet.name}</Typography>
        <Box sx={publicToiletStyles.boxUpper}>
          {user && (
            <>
              <Typography variant="h5">
                Użytkownik {user.email} dodał toalete
              </Typography>
              <Rating value={publicToilet.rate} />
            </>
          )}
        </Box>
        <Typography variant="h6">Opis: {publicToilet.description}</Typography>
        <LeafletMap>
          <Marker position={[publicToilet.lat, publicToilet.lng]}>
            <Popup>some description</Popup>
          </Marker>
        </LeafletMap>
      </>
    </Template>
  ) : null;
});
