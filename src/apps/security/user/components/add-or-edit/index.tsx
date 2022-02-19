import React, { FC, useEffect } from "react";
import { Button, DialogContent, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, DatePicker, Photo, ProfileImage, Select, TextField } from "components/shared";
import { AppState } from "store";
import { IDialog } from "types";
import { IAddOrEditUserRequest } from "../../store/types";
import { StyledDialog } from "./add-or-edit.styled";
import { getAll as getAllModules } from "apps/security/module/store/actions";
import { camelCase, upperFirst } from "lodash";
import { getGenders } from "store/dictionary/actions";
import { getAll as getAllUserGroups } from "apps/security/user-group/store/actions";
import { default as dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

interface IAddOrEdit {
  dialog: IDialog;
  onClose(): void;
  onSubmit(data: IAddOrEditUserRequest): void;
}

export const AddOrEdit: FC<IAddOrEdit> = ({ dialog, onClose, onSubmit }) => {
  const { t, i18n } = useTranslation("common");
  const dispatch = useDispatch();
  const users = useSelector((state: AppState) => state.user.users.r);
  const selectedUser = useSelector((state: AppState) => state.user.selectedUser);
  const genders = useSelector((state: AppState) => state.dictionary.genders);
  const userGroups = useSelector((state: AppState) => state.userGroup.userGroups.r);
  dayjs.extend(customParseFormat);
  // const views = useSelector((state: AppState) => state.views.views);
  // const tables = useSelector((state: AppState) => state.tables.tables);

  useEffect(() => {
    if (dialog.opened) {
      dispatch(getGenders());
      dispatch(getAllUserGroups());
    }
  }, [dialog.opened]);

  const initialValues = users
    ?.filter((u) => u.id === selectedUser)
    ?.map((user) => ({ ...user, birthdate: dayjs(user.birthdate, "DD.MM.YYYY") }))[0];

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
              <div className="photo-container">
                <ProfileImage />
                {/* <Photo
                  photoId={dialog.type === "edit" && initialValues?.photoFileId}
                  placeholderImageName="avatar.svg"
                  width="10rem"
                /> */}
              </div>
              <div className="grid-container">
                <TextField name="pincode" label={t("pincode")} required />
                <TextField name="firstname" label={t("firstname")} required />
                <TextField name="lastname" label={t("lastname")} required />
                <TextField name="patronymic" label={t("patronymic")} required />
                <DatePicker name="birthdate" label={t("birthdate")} required />
                <Select
                  name="genderId"
                  label={t("gender")}
                  data={genders.map((gender) => ({ value: gender.id, label: gender.name }))}
                  required
                />
                <Autocomplete
                  name="groupId"
                  label={t("userGroup")}
                  options={
                    userGroups?.map((group) => ({
                      label: group.name,
                      value: group.id,
                    })) || []
                  }
                  getOptionValue={(option) => option.value}
                  getOptionLabel={(option) => option.label}
                  required
                />
                <TextField name="password" id="password" label={t("password")} />
                {dialog.type === "edit" && <TextField name="oldPassword" id="oldPassword" label={t("oldPassword")} />}
              </div>

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
