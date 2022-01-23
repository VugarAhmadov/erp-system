import React, { FC } from "react";
import { Button, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import { camelCase } from "lodash";
import { useSelector } from "react-redux";
import { Autocomplete, Radios, Select, Switches, TextField } from "components/shared";
import { AppState } from "store";
import { Dialog } from "../..";
import { StyledForm } from "./input-dialog.styled";

interface IInputDialog {
  open: boolean;
  onClose(): void;
  onSubmit(data: any): void;
  params: any;
  dependableModelNames?: any;
}

export const InputDialog: FC<IInputDialog> = ({ open, onClose, onSubmit, params, dependableModelNames }) => {
  const { t } = useTranslation("common");

  const tables = useSelector((state: AppState) => state.tables.tables);
  const views = useSelector((state: AppState) => state.views.views);

  return (
    <Dialog open={open} onClose={onClose}>
      <Form
        onSubmit={onSubmit}
        initialValues={params}
        render={({ handleSubmit, invalid, values }) => (
          <StyledForm onSubmit={handleSubmit}>
            <Typography variant="h6">{t("addInputComponent")}</Typography>

            <div>
              <Radios
                name="componentType"
                data={[
                  { value: "forInsert", label: t("forInsert") as string },
                  { value: "forView", label: t("forView") as string },
                ]}
                radioGroupProps={{ row: true }}
              />
              {values?.componentType === "forInsert" && (
                <>
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
                  <Switches name="required" data={{ label: t("required"), value: "required" }} />
                  <Select
                    name="variant"
                    data={[
                      { label: t("number"), value: "number" },
                      { label: t("text"), value: "text" },
                    ]}
                    required
                    label={t("variants")}
                  />
                  <TextField name="placeholder" label="placeholder" className="field" />
                </>
              )}

              <TextField name="label" label={t("label")} required className="field" />

              <Switches name="disabled" data={{ label: t("disabled"), value: "disabled" }} />
            </div>

            <div>
              <Typography variant="h6">{t("Dependencies")}</Typography>
              <Select
                name="dependedComponent"
                data={[{ label: "select", value: "select" }]}
                required
                label={t("dependedComponent")}
              />
              <Autocomplete
                name="dependedModelName"
                label={t("dependedModelName")}
                options={dependableModelNames || []}
                required
              />
              <Autocomplete name="views" label={t("views")} options={views.map((view) => view.name)} required />
              <Autocomplete
                name="dependedModelField"
                label={t("dependedModelField")}
                options={
                  views
                    ?.find((view) => view.name === values?.views)
                    ?.columns?.map((column) => camelCase(column.name)) || []
                }
                freeSolo
                required
              />
            </div>

            <div className="styles">
              <Typography variant="h6">{t("Styles")}</Typography>
              <TextField name="top" label="top" className="field" />
              <TextField name="left" label="left" className="field" />
              <TextField name="width" label="width" className="field" />
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
