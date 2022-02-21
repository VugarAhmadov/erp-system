import React, { FC } from "react";
import { Button, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import { Select, TextField } from "components/shared";
import { Dialog } from "../..";
import { StyledForm } from "./label-dialog.styled";
import { ILabelParams } from "../label-element";

interface ILabelDialog {
  open: boolean;
  onClose(): void;
  onSubmit(data: ILabelParams): void;
  params: ILabelParams;
}

export const LabelDialog: FC<ILabelDialog> = ({ open, onClose, onSubmit, params }) => {
  const { t } = useTranslation("common");

  return (
    <Dialog open={open} onClose={onClose}>
      <Form
        onSubmit={onSubmit}
        initialValues={params}
        render={({ handleSubmit, invalid }) => (
          <StyledForm onSubmit={handleSubmit}>
            <Typography variant="h6">{t("addLabelComponent")}</Typography>

            <div>
              <TextField name="label" label={t("label")} required className="field" />

              <Select
                name="variant"
                data={[
                  { label: "h1", value: "h1" },
                  { label: "h2", value: "h2" },
                  { label: "h3", value: "h3" },
                  { label: "h4", value: "h4" },
                  { label: "h5", value: "h5" },
                  { label: "h6", value: "h6" },
                  { label: "subtitle1", value: "subtitle1" },
                  { label: "subtitle2", value: "subtitle2" },
                  { label: "body1", value: "body1" },
                  { label: "body2", value: "body2" },
                  { label: "caption", value: "caption" },
                  { label: "button", value: "button" },
                  { label: "overline", value: "overline" },
                ]}
                required
                label={t("variants")}
              />
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
