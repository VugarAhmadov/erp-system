import { Button, DialogContent, Typography } from "@mui/material";
import { TextField } from "components/shared";
import React, { FC } from "react";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import { IDialog } from "types";
import { StyledDialog } from "./add-or-edit.styled";

interface IAddOrEdit {
  dialog: IDialog;
  onClose(): void;
  onSubmit(data: any): void;
}

export const AddOrEdit: FC<IAddOrEdit> = ({ dialog, onClose, onSubmit }) => {
  const { t } = useTranslation("common");

  return (
    <StyledDialog
      open={dialog.opened}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
      maxWidth="xs"
      scroll="paper"
    >
      <DialogContent>
        <Form
          onSubmit={onSubmit}
          // initialValues={dialog.type === "edit" ? { name: selectedTable } : {}}
          render={({ handleSubmit, invalid, values }) => (
            <form onSubmit={handleSubmit} className="form">
              <Typography variant="h6">Add Application</Typography>
              <div className="row">
                <div className="col-6">
                  <TextField name="nameAz" id="nameAz" label={t("nameAz")} required />
                  <TextField name="nameEn" id="nameEn" label={t("nameEn")} required />
                  <TextField name="nameRu" id="nameRu" label={t("nameRu")} required />
                </div>
                <div className="col-6">
                  <TextField name="shortNameAz" id="shortNameAz" label={t("shortNameAz")} required />
                  <TextField name="shortNameEn" id="shortNameEn" label={t("shortNameEn")} required />
                  <TextField name="shortNameRu" id="shortNameRu" label={t("shortNameRu")} required />
                </div>
              </div>
              <TextField name="icon" id="icon" label={t("icon")} />
              <TextField name="url" id="url" label={t("url")} required />

              <div className="action-buttons">
                <Button onClick={onClose} className="back-btn">
                  {t("back")}
                </Button>
                <Button type="submit" disabled={invalid} className="submit-btn">
                  {t(dialog.type === "edit" ? "edit" : "add")}
                </Button>
              </div>
            </form>
          )}
        />
      </DialogContent>
    </StyledDialog>
  );
};
