import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import { StyledAddForm } from "./add-form.styled";
import { Input } from "./components";

export const AddForm = () => {
  const { t } = useTranslation("common");
  const [dialogOpened, setDialogOpened] = useState(false);

  return (
    <>
      <StyledAddForm>
        <Typography variant="h5">{t("addForm")}</Typography>
        <div className="component-buttons">
          <Button onClick={() => setDialogOpened(true)}>{t("input")}</Button>
          <Button onClick={() => console.log("test")}>{t("select")}</Button>
          <Button onClick={() => console.log("test")}>{t("checkbox")}</Button>
          <Button onClick={() => console.log("test")}>{t("label")}</Button>
          <Button onClick={() => console.log("test")}>{t("tab")}</Button>
          <Button onClick={() => console.log("test")}>{t("button")}</Button>
        </div>
      </StyledAddForm>
      <Input open={dialogOpened} onClose={() => setDialogOpened(false)} />
    </>
  );
};
