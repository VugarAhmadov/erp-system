import React, { FC, useEffect } from "react";
import { Button, DialogContent, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, Select, TextField } from "components/shared";
import { AppState } from "store";
import { IDialog } from "types";
import { IAddOrEditUserRequest } from "../../store/types";
import { StyledDialog } from "./add-or-edit.styled";
import { getAll as getAllModules } from "apps/security/module/store/actions";
import { camelCase, upperFirst } from "lodash";

interface IAddOrEdit {
  dialog: IDialog;
  onClose(): void;
  onSubmit(data: IAddOrEditUserRequest): void;
}

export const AddOrEdit: FC<IAddOrEdit> = ({ dialog, onClose, onSubmit }) => {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const users = useSelector((state: AppState) => state.user.users.r);
  const selectedUser = useSelector((state: AppState) => state.user.selectedUser);
  // const modules = useSelector((state: AppState) => state.module.modules);
  // const moduleLoadding = useSelector((state: AppState) => state.module.loading.getAll);
  // const views = useSelector((state: AppState) => state.views.views);
  // const tables = useSelector((state: AppState) => state.tables.tables);

  useEffect(() => {
    dispatch(getAllModules());
  }, []);

  const initialValues = users?.find((u) => u.id === selectedUser);
  // const initialValues = operations
  //   ?.filter((operation) => operation.id === selectedOperation)
  //   ?.map((operation: any) => ({
  //     nameAz: operation.nameAz,
  //     nameEn: operation.nameEn,
  //     nameRu: operation.nameRu,
  //     url: operation.url,
  //     code: operation.code,
  //     viewName: operation.viewName,
  //     applicationId: operation.applicationId,
  //     moduleId: operation.moduleId,
  //   }))[0];

  return (
    <StyledDialog
      open={dialog.opened}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
      maxWidth="sm"
      scroll="paper"
    >
      <DialogContent>
        <Form
          onSubmit={onSubmit}
          initialValues={dialog.type === "edit" ? initialValues : {}}
          render={({ handleSubmit, invalid, values }) => (
            <form onSubmit={handleSubmit} className="form">
              <Typography variant="h6">Add User</Typography>
              <TextField name="firstname" id="firstname" label={t("firstname")} required />
              <TextField name="lastname" id="lastname" label={t("lastname")} required />
              <TextField name="patronymic" id="patronymic" label={t("patronymic")} required />
              <TextField name="pincode" id="pincode" label={t("pincode")} required />
              <Select name="genderId" id="genderId" label={t("gender")} data={[]} />

              <TextField name="password" id="password" label={t("password")} />
              {/* <TextField name="url" id="url" label={t("url")} required />
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
              /> */}
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
