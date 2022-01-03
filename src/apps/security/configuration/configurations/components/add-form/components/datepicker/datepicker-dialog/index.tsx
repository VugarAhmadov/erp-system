import React, { FC } from "react";
import { Button, Typography } from "@mui/material";
import { Select, Switches, TextField } from "components/shared";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { AppState } from "store";
import { Dialog, ModelTextField } from "../..";
import { StyledForm } from "./date-picker-dialog.styled";

interface IDatepickerDialog {
  open: boolean;
  onClose(): void;
  onSubmit(data: any): void;
  params: any;
}

export const DatepickerDialog: FC<IDatepickerDialog> = ({ open, onClose, onSubmit, params }) => {
  const { t } = useTranslation("common");

  const views = useSelector((state: AppState) => state.views.views);
  const selectedOperation = useSelector((state: AppState) => state.configurations.selectedOperation);
  const modules = useSelector((state: AppState) => state.auth.user.applications[0].modules);

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

            <Select
              name="type"
              data={[
                { label: "Year only", value: "year" },
                { label: "Year and Month", value: "year/month" },
                { label: "Year, month and day", value: "year/month/day" },
                { label: "Day, month and year", value: "day/month/year" },
                { label: "Just day", value: "day" },
              ]}
              required
              label={t("types")}
            />

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
