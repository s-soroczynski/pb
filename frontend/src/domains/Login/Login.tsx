import { useForm, SubmitHandler } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { Template } from "../../common/Template/Template";
import { BASE_URL, ROUTES } from "../../constants";
import { setItemToLocalStorage } from "../../helpers";
import { styles } from "./styles";

type InputsType = {
  email: string;
  password: string;
};

export const Login = () => {
  const { register, handleSubmit } = useForm<InputsType>();

  const onSubmit: SubmitHandler<InputsType> = (data) => {
    const formData = new FormData();
    formData.append("username", data.email);
    formData.append("password", data.password);
    fetch(`${BASE_URL}/login`, {
      method: "POST",
      mode: "cors",
      body: formData,
    })
      .then((response) => response.json())
      .then((resp) => {
        if (resp?.access_token) {
          setItemToLocalStorage("token", resp.access_token);
        }
      });
  };

  return (
    <Template>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography sx={styles.title} variant="h2" gutterBottom>
          Zaloguj się
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
          variant="outlined"
          {...register("password", { required: true })}
        />
        <Typography>
          <Link to={ROUTES.HOME}>Załóż konto</Link>
        </Typography>
        <LoadingButton sx={styles.submit} variant="contained" type="submit">
          Wyślij
        </LoadingButton>
      </form>
    </Template>
  );
};
