import React, { FC, useEffect } from "react";
import { Button, DialogContent, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, TextField } from "components/shared";
import { AppState } from "store";
import { IDialog } from "types";
import { IAddOrEditOperationRequest } from "../../store/types";
import { StyledDialog } from "./add-or-edit.styled";
import { getAll as getAllApplications } from "apps/security/application/store/actions";
import { camelCase, capitalize, startCase, upperFirst } from "lodash";

interface IAddOrEdit {
  dialog: IDialog;
  onClose(): void;
  onSubmit(data: IAddOrEditOperationRequest): void;
}

export const AddOrEdit: FC<IAddOrEdit> = ({ dialog, onClose, onSubmit }) => {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const operations = useSelector((state: AppState) => state.operation.operations.r);
  const selectedOperation = useSelector((state: AppState) => state.operation.selectedOperation);
  const apps = useSelector((state: AppState) => state.application.applications);
  const appsLoadding = useSelector((state: AppState) => state.application.loading.getAll);
  const views = useSelector((state: AppState) => state.views.views);
  const tables = useSelector((state: AppState) => state.tables.tables);

  useEffect(() => {
    dispatch(getAllApplications());
  }, []);

  const initialValues = operations
    ?.filter((operation) => operation.id === selectedOperation)
    .map((operation: any) => ({
      nameAz: operation.nameAz,
      nameEn: operation.nameEn,
      nameRu: operation.nameRu,
      url: operation.url,
      code: operation.code,
      viewName: operation.viewName,
      applicationId: operation.applicationId,
      entityName: operation.enditiyName,
      operationId: operation.operationId,
      operationName: operation.operationName,
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
              <Typography variant="h6">Add Operation</Typography>
              <TextField name="nameAz" id="nameAz" label={t("nameAz")} required />
              <TextField name="nameEn" id="nameEn" label={t("nameEn")} required />
              <TextField name="nameRu" id="nameRu" label={t("nameRu")} required />
              <TextField name="code" id="code" label={t("code")} required />
              <TextField name="icon" id="icon" label={t("icon")} />
              <TextField name="url" id="url" label={t("url")} required />
              <Autocomplete
                name="operationName"
                id="operationName"
                label={t("operationName")}
                options={["ADD", "EDIT", "DELETE", "VIEW"]}
                required
              />
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
              {/* <Autocomplete
                name="operationId"
                id="operationId"
                label={t("operationId")}
                options={operations.map((operation) => ({
                  label: operation.name,
                  value: operation.id,
                }))}
                getOptionValue={(option) => option.value}
                getOptionLabel={(option) => option.label}
              /> */}
              <Autocomplete
                name="viewName"
                id="viewName"
                label={t("viewName")}
                options={views.map((view) => ({
                  label: view.name,
                  value: view.name,
                }))}
                getOptionValue={(option) => option.value}
                getOptionLabel={(option) => option.label}
              />
              <Autocomplete
                name="entityName"
                id="entityName"
                label={t("entityName")}
                options={tables.map((table) => upperFirst(camelCase(table.name)))}
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
