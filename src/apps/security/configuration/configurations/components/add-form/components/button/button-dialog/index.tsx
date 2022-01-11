import React, { FC } from "react";
import { Button, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import { Select, TextField } from "components/shared";
import { Dialog } from "../..";
import { StyledForm } from "./button-dialog.styled";

interface IButtonDialog {
  open: boolean;
  onClose(): void;
  onSubmit(data: any): void;
  params: any;
}

export const ButtonDialog: FC<IButtonDialog> = ({ open, onClose, onSubmit, params }) => {
  const { t } = useTranslation("common");

  return (
    <Dialog open={open} onClose={onClose}>
      <Form
        onSubmit={onSubmit}
        initialValues={params}
        render={({ handleSubmit, invalid, values }) => (
          <StyledForm onSubmit={handleSubmit}>
            <Typography variant="h6">{t("addButtonComponent")}</Typography>

            <div>
              <TextField name="label" label={t("label")} required className="field" />

              <Select
                name="sort"
                data={[
                  { label: "Button", value: "button" },
                  { label: "Link", value: "link" },
                  { label: "Icon", value: "icon" },
                ]}
                required
                label={t("sorts")}
              />

              {values?.sort !== "icon" && (
                <Select
                  name="variant"
                  data={[
                    { label: "Text", value: "text" },
                    { label: "Contained", value: "contained" },
                    { label: "Outlined", value: "outlined" },
                  ]}
                  required
                  label={t("variants")}
                />
              )}

              {values?.sort === "icon" && (
                <TextField name="iconName" label={t("iconName")} required className="field" />
              )}

              {values?.sort === "link" && <TextField name="linkUrl" label={t("linkUrl")} required className="field" />}

              <Select
                name="color"
                data={[
                  { label: "Error", value: "error" },
                  { label: "Info", value: "info" },
                  { label: "Warning", value: "warning" },
                  { label: "Success", value: "success" },
                  { label: "Primary", value: "primary" },
                  { label: "Secondary", value: "secondary" },
                  { label: "Inherit", value: "inherit" },
                ]}
                required
                label={t("colors")}
              />

              <Select
                name="size"
                data={[
                  { label: "Small", value: "small" },
                  { label: "Medium", value: "medium" },
                  { label: "Large", value: "large" },
                ]}
                required
                label={t("sizes")}
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
