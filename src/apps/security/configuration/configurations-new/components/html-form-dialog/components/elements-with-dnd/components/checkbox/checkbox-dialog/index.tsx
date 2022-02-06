import React, { FC } from "react";
import { Button, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { camelCase } from "lodash";
import { Autocomplete, Switches, TextField } from "components/shared";
import { AppState } from "store";
import { Dialog } from "../..";
import { StyledForm } from "./checkbox-dialog.styled";
import { ICheckboxParams } from "../checkbox-element";

interface ICheckboxDialog {
  open: boolean;
  onClose(): void;
  onSubmit(data: ICheckboxParams): void;
  params: ICheckboxParams;
}

export const CheckboxDialog: FC<ICheckboxDialog> = ({ open, onClose, onSubmit, params }) => {
  const { t } = useTranslation("common");

  const tables = useSelector((state: AppState) => state.tables.tables);

  return (
    <Dialog open={open} onClose={onClose}>
      <Form
        onSubmit={onSubmit}
        initialValues={params}
        render={({ handleSubmit, invalid, form, values }) => (
          <StyledForm onSubmit={handleSubmit}>
            <Typography variant="h6">{t("addCheckboxComponent")}</Typography>

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
                  tables
                    ?.find((table) => table.name === values?.table)
                    ?.columns?.map((column) => camelCase(column.name)) || []
                }
                disabled={!values?.table}
                required
              />

              <TextField name="label" label={t("label")} required className="field" />

              <Switches name="required" data={{ label: t("required"), value: "required" }} />
            </div>

            <div className="action-buttons">
              <Button onClick={onClose} className="cancel-btn" variant="outlined">
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
