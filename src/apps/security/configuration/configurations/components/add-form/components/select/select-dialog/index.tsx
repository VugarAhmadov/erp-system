import React, { FC } from "react";
import { Button, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, Select, Switches, TextField } from "components/shared";
import { AppState } from "store";
import { Dialog } from "../..";
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

  const tables = useSelector((state: AppState) => state.tables.tables);

  const urlLists = useSelector((state: AppState) => state.auth.user.privilegeList);

  const dicTypes = useSelector((state: AppState) => state.configurations.dictionaryTpyeList);

  return (
    <Dialog open={open} onClose={onClose}>
      <Form
        onSubmit={onSubmit}
        initialValues={params}
        render={({ handleSubmit, invalid, form, values }) => (
          <StyledForm onSubmit={handleSubmit}>
            <Typography variant="h6">{t("addSelectComponent")}</Typography>

            <div>
              <Autocomplete
                name="table"
                id="table"
                label={t("tables")}
                options={tables?.map((table) => table.name)}
                required
              />

              <Autocomplete
                name="model"
                id="model"
                label={t("model")}
                options={
                  tables?.find((table) => table.name === values?.table)?.columns?.map((column) => column.name) || []
                }
                disabled={!values?.table}
                required
              />

              <TextField name="label" label={t("label")} required className="field" />

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
                <>
                  <Select
                    name="dicId"
                    data={dicTypes?.map((type) => ({
                      label: type.name,
                      value: type.id,
                    }))}
                    required
                    label={t("dicId")}
                  />
                  <TextField name="parentDicId" label={t("parentDicId")} className="field" />
                </>
              )}

              {values?.dataType === "rest" && (
                <>
                  <Autocomplete name="dataUrl" id="dataUrl" label={t("dataUrls")} options={urlLists} required />
                  <TextField name="dataName" label={t("dataName")} required className="field" />
                </>
              )}

              <Switches name="required" data={{ label: t("required"), value: "required" }} />
            </div>

            <div className="styles">
              <Typography variant="h6">{t("Styles")}</Typography>
              <TextField name="top" label="top" className="field" />
              <TextField name="left" label="left" className="field" />
              <TextField name="width" label="width" className="field" />
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
