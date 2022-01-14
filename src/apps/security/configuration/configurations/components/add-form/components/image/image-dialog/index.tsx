import React, { FC } from "react";
import { Button, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import { Select, TextField } from "components/shared";
import { Dialog } from "../..";
import { StyledForm } from "./image-dialog.styled";

interface IImageDialog {
  open: boolean;
  onClose(): void;
  onSubmit(data: any): void;
  params: any;
}

export const ImageDialog: FC<IImageDialog> = ({ open, onClose, onSubmit, params }) => {
  const { t } = useTranslation("common");

  return (
    <Dialog open={open} onClose={onClose}>
      <Form
        onSubmit={onSubmit}
        initialValues={params}
        render={({ handleSubmit, invalid }) => (
          <StyledForm onSubmit={handleSubmit}>
            <Typography variant="h6">{t("addImageComponent")}</Typography>

            <div>
              <TextField name="src" label={t("src")} className="field" />
              <TextField name="alt" label={t("alt")} className="field" />
              <TextField name="dependedModelName" label={t("dependedModelName")} className="field" />
              <TextField name="dependedModelField" label={t("dependedModelField")} className="field" />
              <Select
                name="dependedComponent"
                data={[{ label: "select", value: "select" }]}
                required
                label={t("dependedComponent")}
              />
            </div>

            <div className="styles">
              <Typography variant="h6">{t("Styles")}</Typography>
              <TextField name="top" label="top" className="field" />
              <TextField name="left" label="left" className="field" />
              <TextField name="width" label="width" className="field" />
              <TextField name="height" label="height" className="field" />
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
