import React, { FC } from "react";
import { Button, DialogContent, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Autocomplete, TextField } from "components/shared";
import { AppState } from "store";
import { IDialog } from "types";
import { IAddOrEditApplicationRequest } from "../../store/types";
import { StyledDialog } from "./add-or-edit.styled";

interface IAddOrEdit {
  dialog: IDialog;
  onClose(): void;
  onSubmit(data: IAddOrEditApplicationRequest): void;
}

export const AddOrEdit: FC<IAddOrEdit> = ({ dialog, onClose, onSubmit }) => {
  const { t } = useTranslation("common");
  const apps = useSelector((state: AppState) => state.application.applications.r);
  const selectedApp = useSelector((state: AppState) => state.application.selectedApp);

  const initialValues = apps
    ?.filter((app) => app.id === selectedApp)
    ?.map((app: any) => ({
      nameAz: app.nameAz,
      nameEn: app.nameEn,
      nameRu: app.nameRu,
      shortNameAz: app.shortNameAz,
      shortNameEn: app.shortNameEn,
      shortNameRu: app.shortNameRu,
      url: app.url,
      icon: app.icon,
      parentId: app.parentId,
    }))[0];

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
          initialValues={dialog.type === "edit" ? initialValues : {}}
          render={({ handleSubmit, invalid }) => (
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
              <Autocomplete
                name="parentId"
                id="parentId"
                label={t("parentId")}
                options={apps?.map((app) => ({
                  label: app.name,
                  value: app.id,
                }))}
                getOptionValue={(option) => option.value}
                getOptionLabel={(option) => option.label}
              />
              <div className="action-buttons">
                <Button onClick={onClose} className="back-btn" variant="outlined" color="info">
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
