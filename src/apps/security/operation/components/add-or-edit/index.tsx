import React, { FC, useEffect } from "react";
import { Button, DialogContent, InputAdornment, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, TextField } from "components/shared";
import { AppState } from "store";
import { IDialog } from "types";
import { IAddOrEditOperationRequest } from "../../store/types";
import { StyledDialog } from "./add-or-edit.styled";
import { getAll as getAllModules } from "apps/security/module/store/actions";
import {getAll as getAllTables} from "apps/security/configuration/tables/store/actions";
import {getAll as getAllViews} from "apps/security/configuration/views/store/actions";
import { camelCase, upperFirst } from "lodash";
import { useValidators } from "hooks";

interface IAddOrEdit {
  dialog: IDialog;
  onClose(event: {}, reason: "backdropClick" | "escapeKeyDown" | "closeButtonClick"): void;
  onSubmit(data: IAddOrEditOperationRequest): void;
}

export const AddOrEdit: FC<IAddOrEdit> = ({ dialog, onClose, onSubmit }) => {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const operations = useSelector((state: AppState) => state.operation.operations.r);
  const selectedOperation = useSelector((state: AppState) => state.operation.selectedOperation);
  const modules = useSelector((state: AppState) => state.module.modules);
  const moduleLoadding = useSelector((state: AppState) => state.module.loading.getAll);
  const views = useSelector((state: AppState) => state.views.views);
  const tables = useSelector((state: AppState) => state.tables.tables);

  // const { validUrl } = useValidators();

  useEffect(() => {
    dispatch(getAllModules());
    dispatch(getAllTables());
    dispatch(getAllViews());
  }, []);

  const initialValues = operations
    ?.filter((operation) => operation.id === selectedOperation)
    ?.map((operation: any) => ({
      nameAz: operation.nameAz,
      nameEn: operation.nameEn,
      nameRu: operation.nameRu,
      url: operation.url,
      code: operation.code,
      viewName: operation.viewName,
      applicationId: operation.applicationId,
      moduleId: operation.moduleId,
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
          render={({ handleSubmit, invalid, values }) => (
            <form onSubmit={handleSubmit} className="form">
              <Typography variant="h6">Add Operation</Typography>
              <TextField name="nameAz" id="nameAz" label={t("nameAz")} required />
              <TextField name="nameEn" id="nameEn" label={t("nameEn")} required />
              <TextField name="nameRu" id="nameRu" label={t("nameRu")} required />
              <TextField name="code" id="code" label={t("code")} required />
              <TextField name="icon" id="icon" label={t("icon")} />
              <TextField
                name="url"
                id="url"
                label={t("url")}
                required
                className="url-input"
                InputProps={{
                  startAdornment: <InputAdornment position="start">/jwt/CodiumSystem/</InputAdornment>,
                }}
              />
              {dialog.type === "add" && (
                <>
                  <Autocomplete
                    name="operationName"
                    id="operationName"
                    label={t("operationName")}
                    options={["ADD", "EDIT", "DELETE", "VIEW"]}
                    required
                  />
                  <Autocomplete
                    name="entity"
                    id="entityName"
                    label={t("entityName")}
                    options={
                      values.operationName === "VIEW"
                        ? views?.map((view) => `V_${camelCase(view.name).substr(1)}`)
                        : tables?.map((table) => upperFirst(camelCase(table.name)))
                    }
                  />
                </>
              )}

              <Autocomplete
                name="moduleId"
                id="moduleId"
                label={t("moduleId")}
                options={modules?.r?.map((module) => ({
                  label: module.name,
                  value: module.id,
                }))}
                getOptionValue={(option) => option.value}
                getOptionLabel={(option) => option.label}
                loading={moduleLoadding}
              />
              {/* <Autocomplete
                name="viewName"
                id="viewName"
                label={t("viewName")}
                options={views?.map((view) => ({
                  label: view.name,
                  value: view.name,
                }))}
                getOptionValue={(option) => option.value}
                getOptionLabel={(option) => option.label}
              /> */}
              <div className="action-buttons">
                <Button
                  onClick={() => onClose({}, "closeButtonClick")}
                  className="back-btn"
                  variant="outlined"
                  color="info"
                >
                  {t("close")}
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
