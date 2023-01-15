import { useForm, SubmitHandler } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { TextField, Typography } from "@mui/material";

import { Template } from "../../common/Template/Template";
import { BASE_URL, ROUTES } from "../../constants";
import { useNavigate } from "react-router-dom";
import { styles } from "./styles";

type InputsType = {
  email: string;
  password: string;
};

export const Registration = () => {
  const navigation = useNavigate();
  const { register, handleSubmit } = useForm<InputsType>();

  const onSubmit: SubmitHandler<InputsType> = (data) => {
    // TODO obsłuzyć jak użytkownik już istnieje + errory
    fetch(`${BASE_URL}/users`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => {
        navigation(ROUTES.LOGIN, { replace: true });
      });
  };

  return (
    <Template>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography sx={styles.title} variant="h2" gutterBottom>
          Zarejestruj się
        </Typography>
        <TextField
          sx={styles.textfield}
          label="Email"
          variant="outlined"
          {...register("email", { required: true })}
        />
        <TextField
          sx={styles.textfield}
          label="Hasło"
          type="password"
          variant="outlined"
          {...register("password", { required: true })}
        />
        <LoadingButton sx={styles.submit} variant="contained" type="submit">
          Wyślij
        </LoadingButton>
      </form>
    </Template>
  );
};
