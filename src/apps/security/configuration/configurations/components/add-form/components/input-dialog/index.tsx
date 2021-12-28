import { Button, Typography } from "@mui/material";
import { Select, Switches, TextField } from "components/shared";
import React, { FC } from "react";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import { Dialog } from "..";
import { StyledForm } from "./input.styled";

interface IInputDialog {
  open: boolean;
  onClose(): void;
  onSubmit(data: any): void;
  params: any;
}

export const InputDialog: FC<IInputDialog> = ({ open, onClose, onSubmit, params }) => {
  const { t } = useTranslation("common");

  return (
    <Dialog open={open} onClose={onClose}>
      <Form
        onSubmit={onSubmit}
        initialValues={params}
        render={({ handleSubmit, invalid }) => (
          <StyledForm onSubmit={handleSubmit}>
            <Typography variant="h6">{t("addInputComponent")}</Typography>
            <div className="model-field">
              <TextField name="model" label="model" required />
            </div>
            <TextField name="label" label={t("label")} required className="field" />
            <TextField name="placeholder" label="placeholder" className="field" />
            <Select
              name="type"
              data={[
                { label: t("number"), value: "number" },
                { label: t("text"), value: "text" },
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
