import React, { FC } from "react";
import { Button, Typography } from "@mui/material";
import { Select, Switches, TextField } from "components/shared";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "store";
import { Dialog, ModelTextField } from "../..";
import { StyledForm } from "./select-dialog.styled";
import { getDictionaryTypeList } from "apps/security/configuration/configurations/store/actions";

interface ISelectDialog {
  open: boolean;
  onClose(): void;
  onSubmit(data: any): void;
  params: any;
}

export const SelectDialog: FC<ISelectDialog> = ({ open, onClose, onSubmit, params }) => {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();

  const views = useSelector((state: AppState) => state.views.views);
  const selectedOperation = useSelector((state: AppState) => state.configurations.selectedOperation);
  const modules = useSelector((state: AppState) => state.auth.user.applications[0].modules);
  const privilageList = useSelector((state: AppState) => state.auth.user.privilegeList);

  const dicTypes = useSelector((state: AppState) => state.configurations.dictionaryTpyeList);

  return (
    <Dialog open={open} onClose={onClose}>
      <Form
        onSubmit={onSubmit}
        initialValues={params}
        render={({ handleSubmit, invalid, form, values }) => (
          <StyledForm onSubmit={handleSubmit}>
            <Typography variant="h6">{t("addSelectComponent")}</Typography>
            <ModelTextField
              menuData={
                views
                  .find(
                    (view) =>
                      view.name ===
                      modules
                        .find((module) => module.id === selectedOperation.moduleId)
                        ?.operations.find((operation) => operation.code === "ALL_VIEW")?.viewName
                  )
                  ?.columns?.map((column) => column.name)!
              }
              fieldName="model"
              fieldLabel="model"
              form={form}
            />

            <TextField name="label" label={t("label")} required className="field" />
            <TextField name="placeholder" label={t("placeholder")} className="field" />
            <Select
              name="dataType"
              data={[
                { label: t("dictionary"), value: "dic" },
                { label: t("restApi"), value: "rest" },
              ]}
              required
              label={t("dataTypes")}
              inputProps={{
                onChange: (e: any) => {
                  if (e.target.value === "dic") {
                    dispatch(getDictionaryTypeList());

                    if (values?.dataUrl) {
                      form.change("dataUrl");
                      form.resetFieldState("dataUrl");
                    }
                    if (values?.dataName) {
                      form.change("dataName");
                      form.resetFieldState("dataName");
                    }
                  } else {
                    if (values?.dicId) {
                      form.change("dicId");
                      form.resetFieldState("dicId");
                    }
                  }
                },
              }}
            />
            {values?.dataType === "dic" && (
              <Select
                name="dicId"
                data={dicTypes?.map((type) => ({
                  label: type.name,
                  value: type.id,
                }))}
                required
                label={t("dicId")}
              />
            )}
            {values?.dataType === "rest" && (
              <>
                <ModelTextField
                  menuData={privilageList.filter((x) => x.split("/")[x.split("/").length - 1] === "AllViewByCommon")!}
                  fieldName="dataUrl"
                  fieldLabel="dataUrl"
                  form={form}
                />
                <TextField name="dataName" label={t("dataName")} className="field" />
              </>
            )}
            <TextField name="parentDicId" label={t("parentDicId")} className="field" />
            <div className="switch">
              <Switches name="required" data={{ label: t("required"), value: "required" }} />
            </div>

            <div className="action-buttons">
              <Button onClick={onClose} className="cancel-btn">
                {t("cancel")}
              </Button>
              <Button type="submit" className="add-btn" disabled={invalid}>
                {t("add")}
              </Button>
            </div>
          </StyledForm>
        )}
      />
    </Dialog>
  );
};
