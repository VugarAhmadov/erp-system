import React, { FC } from "react";
import { Button, IconButton, Icon, Tooltip, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import { camelCase } from "lodash";
import arrayMutators from "final-form-arrays";
import { useSelector } from "react-redux";
import { Autocomplete, Select, Switches, TextField } from "components/shared";
import { AppState } from "store";
import { Dialog } from "../..";
import { StyledForm } from "./radio-dialog.styled";
import { FieldArray } from "react-final-form-arrays";

interface IRadioDialog {
  open: boolean;
  onClose(): void;
  onSubmit(data: any): void;
  params: any;
}

export const RadioDialog: FC<IRadioDialog> = ({ open, onClose, onSubmit, params }) => {
  const { t } = useTranslation("common");

  const tables = useSelector((state: AppState) => state.tables.tables);

  return (
    <Dialog open={open} onClose={onClose}>
      <Form
        onSubmit={onSubmit}
        initialValues={
          params ?? {
            radioData: [
              { value: "", label: "" },
              { value: "", label: "" },
            ],
          }
        }
        mutators={{
          ...arrayMutators,
        }}
        render={({ handleSubmit, invalid, values, form }) => (
          <StyledForm onSubmit={handleSubmit}>
            <Typography variant="h6">{t("addInputComponent")}</Typography>

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

              <div className="add-radios">
                <Button onClick={() => form.mutators.push("radioData", { value: "", label: "" })}>Add Radio</Button>
                <FieldArray name="radioData">
                  {({ fields }) => (
                    <div className="radio-fields">
                      {fields.map((name, index) => (
                        <div key={name} className="radio-field">
                          <span className="field-index">{index + 1}.</span>
                          <TextField name={`${name}.value`} required label={t("value")} />
                          <TextField name={`${name}.label`} required label={t("label")} />
                          {fields.length! > 2 && (
                            <Tooltip title={t("remove") as string}>
                              <IconButton onClick={() => fields.remove(index)} size="small">
                                <Icon fontSize="small">delete</Icon>
                              </IconButton>
                            </Tooltip>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </FieldArray>
              </div>

              <Select
                name="direction"
                data={[
                  { label: t("row"), value: "row" },
                  { label: t("column"), value: "column" },
                ]}
                required
                label={t("direction")}
              />

              <Switches name="required" data={{ label: t("required"), value: "required" }} />
              <Switches name="disabled" data={{ label: t("disabled"), value: "disabled" }} />
            </div>

            {/* <div>
              <Typography variant="h6">{t("Dependencies")}</Typography>
              <Select
                name="dependedComponent"
                data={[{ label: "select", value: "select" }]}
                required
                label={t("dependedComponent")}
              />
              <TextField name="dependedModelName" label={t("dependedModelName")} className="field" />
              <TextField name="dependedModelField" label={t("dependedModelField")} className="field" />
            </div> */}

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
