import React, { FC } from "react";
import { Button, DialogContent, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, TextField } from "components/shared";
import { AppState } from "store";
import { IDialog } from "types";
import { IAddOrEditModuleRequest } from "../../store/types";
import { StyledDialog } from "./add-or-edit.styled";

interface IAddOrEdit {
  dialog: IDialog;
  onClose(): void;
  onSubmit(data: IAddOrEditModuleRequest): void;
}

export const AddOrEdit: FC<IAddOrEdit> = ({ dialog, onClose, onSubmit }) => {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const modules = useSelector((state: AppState) => state.module.modules.r);
  const selectedModule = useSelector((state: AppState) => state.module.selectedModule);
  const apps = useSelector((state: AppState) => state.application.applications);
  const appsLoadding = useSelector((state: AppState) => state.application.loading.getAll);

  const initialValues = modules
    ?.filter((module) => module.id === selectedModule)
    .map((module: any) => ({
      nameAz: module.nameAz,
      nameEn: module.nameEn,
      nameRu: module.nameRu,
      shortNameAz: module.shortNameAz,
      shortNameEn: module.shortNameEn,
      shortNameRu: module.shortNameRu,
      url: module.url,
      code: module.code,
      icon: module.icon,
      applicationId: module.applicationId,
      parentId: module.parentId,
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
              <Typography variant="h6">Add Module</Typography>
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
              <TextField name="code" id="code" label={t("code")} required />
              <TextField name="icon" id="icon" label={t("icon")} />
              <TextField name="url" id="url" label={t("url")} required />
              <Autocomplete
                name="applicationId"
                id="applicationId"
                label={t("applicationId")}
                options={apps?.r.map((app) => ({
                  label: app.name,
                  value: app.id,
                }))}
                getOptionValue={(option) => option.value}
                getOptionLabel={(option) => option.label}
                loading={appsLoadding}
              />
              <Autocomplete
                name="parentId"
                id="parentId"
                label={t("parentId")}
                options={modules.map((module) => ({
                  label: module.name,
                  value: module.id,
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
