import React, { FC } from "react";
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from "@mui/material";
import { StyledDialog } from "./view-insert.styled";
import { Form } from "react-final-form";
import { TextField } from "components/shared";
import { useTranslation } from "react-i18next";
import { useValidators } from "hooks";

interface IViewInsert {
  open: boolean;
  handleClose(): void;
}

export const ViewInsert: FC<IViewInsert> = ({ open, handleClose }) => {
  const { t } = useTranslation("common");
  const { required } = useValidators();

  return (
    <StyledDialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
      maxWidth="md"
      scroll="paper"
    >
      {/* <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle> */}
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Form
              onSubmit={(data) => console.log(data)}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <TextField name="viewName" id="viewName" label={t("viewName")} validate={required} />
                  <TextField name="viewScript" id="viewScript" label={t("viewScript")} validate={required} />
                </form>
              )}
            />
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </DialogContent>
    </StyledDialog>
  );
};
