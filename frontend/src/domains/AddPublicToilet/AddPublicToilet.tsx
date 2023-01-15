import { useForm, SubmitHandler } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { TextField, Typography } from "@mui/material";

import { Template } from "../../common/Template/Template";
import {
  GoogleMapReactApi,
  MarkerType,
} from "../../common/Map/GoogleMapReactApi";
import { BASE_URL } from "../../constants";
import { getItemFromLocalStorage } from "../../helpers";
import { styles } from "./styles";

type InputsType = {
  name: string;
  description: string;
  lat: number;
  lng: number;
  rate: number;
};

export const AddPublicToilet = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<InputsType>({
    defaultValues: {
      rate: 1,
    },
  });
  register("rate", { required: true });
  register("lat", { required: true });
  register("lng", { required: true });
 
  const onSubmit: SubmitHandler<InputsType> = (data) => {
    fetch(`${BASE_URL}/public-toilets`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getItemFromLocalStorage("token")}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "data");
      });
  };

  const handleClickOnMap = (marker: MarkerType) => {
    setValue("lng", marker.lng);
    setValue("lat", marker.lat);
  };

  return (
    <Template>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography sx={styles.title} variant="h2" gutterBottom>
          Dodaj nową publiczną toaletę
        </Typography>
        <TextField
          sx={styles.name}
          label="Nazwa"
          variant="outlined"
          {...register("name", { required: true })}
        />
        <TextField
          sx={styles.name}
          label="Opis"
          placeholder="Podaj,opis który może pomóc w znalezieniu toalety"
          type="textarea"
          variant="outlined"
          {...register("description", { required: true })}
        />
        <GoogleMapReactApi handleOnClickMap={handleClickOnMap} />
        <LoadingButton sx={styles.submit} variant="contained" type="submit">
          zapisz
        </LoadingButton>
      </form>
    </Template>
  );
};
