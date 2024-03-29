import React, { FC } from "react";
import { Button, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { camelCase } from "lodash";
import { Autocomplete, Select, Switches, TextField } from "components/shared";
import { Dialog } from "../../..";
import { StyledForm } from "./label-dialog.styled";
import { IFileUploadParams } from "../file-upload-element";
import { AppState } from "store";

interface IFileUploadDialog {
  open: boolean;
  onClose(): void;
  onSubmit(data: IFileUploadParams): void;
  params: IFileUploadParams;
}

export const FileUploadDialog: FC<IFileUploadDialog> = ({ open, onClose, onSubmit, params }) => {
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
            <Typography variant="h6">{t("addFileUploadComponent")}</Typography>

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
