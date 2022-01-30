import React, { FC } from "react";
import { Button, DialogContent, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, TextField } from "components/shared";
import { AppState } from "store";
import { IDialog } from "types";
import { IAddOrEditCommonOperationRequest } from "../../store/types";
import { StyledDialog } from "./add-or-edit.styled";
import { getAll as getAllModules } from "apps/security/module/store/actions";
import { camelCase, upperFirst } from "lodash";

interface IAddOrEdit {
  dialog: IDialog;
  onClose(): void;
  onSubmit(data: IAddOrEditCommonOperationRequest): void;
}

export const AddOrEdit: FC<IAddOrEdit> = ({ dialog, onClose, onSubmit }) => {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const operations = useSelector((state: AppState) => state.operation.operations.r);
  const selectedOperation = useSelector((state: AppState) => state.operation.selectedOperation);
  const views = useSelector((state: AppState) => state.views.views);
  const tables = useSelector((state: AppState) => state.tables.tables);

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
              <Typography variant="h6">Add Common Operation</Typography>
              <TextField name="url" id="url" label={t("url")} required />
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
