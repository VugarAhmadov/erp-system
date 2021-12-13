import React from "react";
import { Form } from "react-final-form";
import { Button, Typography } from "@mui/material";
import { TextField } from "components/shared";
import { useValidators } from "hooks";
import { StyledLogin } from "./login.styled";
import { useTranslation } from "react-i18next";
import { ILoginData } from "../store/types";
import { useDispatch } from "react-redux";
import { login } from "../store/actions";

export const Login = () => {
  const { required } = useValidators();
  const { t } = useTranslation("login");
  const dispatch = useDispatch();

  return (
    <StyledLogin>
      <Form
        onSubmit={(data: ILoginData) => dispatch(login(data))}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <TextField name="username" id="username" label={t("username")} validate={required} />
            <TextField name="password" id="password" label={t("password")} validate={required} type="password" />
            <Button variant="contained" type="submit">
              {t("login")}
            </Button>
          </form>
        )}
      />
    </StyledLogin>
  );
};
