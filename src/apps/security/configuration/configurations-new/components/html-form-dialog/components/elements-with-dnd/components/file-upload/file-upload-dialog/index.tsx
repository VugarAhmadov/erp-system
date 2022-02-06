import React, { FC } from "react";
import { Button, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import { Select, Switches, TextField } from "components/shared";
import { Dialog } from "../..";
import { StyledForm } from "./label-dialog.styled";
import { IFileUploadParams } from "../file-upload-element";

interface IFileUploadDialog {
  open: boolean;
  onClose(): void;
  onSubmit(data: IFileUploadParams): void;
  params: IFileUploadParams;
}

export const FileUploadDialog: FC<IFileUploadDialog> = ({ open, onClose, onSubmit, params }) => {
  const { t } = useTranslation("common");

  return (
    <Dialog open={open} onClose={onClose}>
      <Form
        onSubmit={onSubmit}
        initialValues={params}
        render={({ handleSubmit, invalid }) => (
          <StyledForm onSubmit={handleSubmit}>
            <Typography variant="h6">{t("addFileUploadComponent")}</Typography>

            <div>
              <TextField name="label" label={t("label")} required className="field" />

              <Select
                name="variant"
                data={[
                  { label: "image", value: "image" },
                  { label: "file", value: "file" },
                ]}
                required
                label={t("variants")}
              />

              <Switches name="multiple" data={{ label: t("multiple"), value: "multiple" }} />
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
