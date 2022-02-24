import React, { FC } from "react";
import { Button, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import { camelCase } from "lodash";
import { useSelector } from "react-redux";
import { Autocomplete, TextField } from "components/shared";
import { Dialog } from "../../..";
import { StyledForm } from "./profile-image-dialog.styled";
import { IProfileImageParams } from "../profile-image-element";
import { AppState } from "store";

interface IProfileImageDialog {
  open: boolean;
  onClose(): void;
  onSubmit(data: IProfileImageParams): void;
  params: IProfileImageParams;
}

export const ProfileImageDialog: FC<IProfileImageDialog> = ({ open, onClose, onSubmit, params }) => {
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
            <Typography variant="h6">{t("addProfileImageComponent")}</Typography>

            <div>
              {/* <TextField name="label" label={t("label")} required className="field" /> */}

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
