import React, { FC, Fragment } from "react";
import { Button, DialogContent, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Autocomplete, TextField } from "components/shared";
import { AppState } from "store";
import { IDialog } from "types";
import { IAddOrEditApplicationRequest } from "../../store/types";
import { StyledDialog } from "./add-or-edit.styled";
import i18n from "translation";
import { IName } from "apps/auth/store/types";

interface IAddOrEdit {
  dialog: IDialog;
  onClose(): void;
  onSubmit(data: IAddOrEditApplicationRequest): void;
}

export const AddOrEdit: FC<IAddOrEdit> = ({ dialog, onClose, onSubmit }) => {
  const { t } = useTranslation("common");
  const apps = useSelector((state: AppState) => state.application.applications.r);
  const selectedApp = useSelector((state: AppState) => state.application.selectedApp);

  const module = useSelector((state: AppState) => state.module.module);

  const data = JSON.parse(module.operations.find((op) => op.code === "ADD")?.formHtml!);

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
      maxWidth={data.dialogSize}
      scroll="paper"
    >
      <DialogContent>
        <div className="form-header">
          {dialog.type === "add" && (
            <Typography variant="h5">
              {module.operations.find((op) => op.code === "ADD")?.name[i18n.language as keyof IName]}
            </Typography>
          )}
          {dialog.type === "edit" && (
            <Typography variant="h5">
              {module.operations.find((op) => op.code === "EDIT")?.name[i18n.language as keyof IName]}
            </Typography>
          )}

          <div className="action-buttons">
            <Button
              onClick={
                () => {}
                // onSubmit({ operationHtml: JSON.stringify(formElements), operationId: selectedOperation.id })
              }
              className="submit-btn"
            >
              {t("submit")}
            </Button>
            <Button onClick={onClose} variant="outlined">
              {t("close")}
            </Button>
          </div>
        </div>

        <Form
          onSubmit={onSubmit}
          initialValues={dialog.type === "edit" ? initialValues : {}}
          render={({ handleSubmit, invalid }) => (
            <form onSubmit={handleSubmit} className="form">
              {data.formElements?.map((element: any) => (
                <Fragment key={element.index}>
                  {element.element === "input" && (
                    <TextField
                      name={element.params.model}
                      label={element.params.label}
                      style={{
                        position: "absolute",
                        transform: `translate3d(${element.params.left}px, ${element.params.top}px, 0)`,
                      }}
                      fullWidth={false}
                      required={element.params.required}
                    />
                  )}
                </Fragment>
              ))}
            </form>
          )}
        />
      </DialogContent>
    </StyledDialog>
  );
};
