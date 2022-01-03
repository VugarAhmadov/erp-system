import React, { FC } from "react";
import { Button, Typography } from "@mui/material";
import { Select, Switches, TextField } from "components/shared";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { AppState } from "store";
import { Dialog, ModelTextField } from "../..";
import { StyledForm } from "./label-dialog.styled";

interface ILabelDialog {
  open: boolean;
  onClose(): void;
  onSubmit(data: any): void;
  params: any;
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
            <Typography variant="h6">{t("addSelectComponent")}</Typography>
            <TextField name="label" label={t("label")} required className="field" />

            <Select
              name="type"
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
