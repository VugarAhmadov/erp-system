import React, { FC } from "react";
import { Button, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import { Select, TextField } from "components/shared";
import { Dialog } from "../../dialog";
import { StyledForm } from "./grid-row-dialog.styled";
import { IGridRowParams } from "../../types";

interface IGridRowDialog {
  open: boolean;
  onClose(): void;
  onSubmit(data: IGridRowParams): void;
  params: IGridRowParams;
}

export const GridRowDialog: FC<IGridRowDialog> = ({ open, onClose, onSubmit, params }) => {
  const { t } = useTranslation("common");

  return (
    <Dialog open={open} onClose={onClose}>
      <Form
        onSubmit={onSubmit}
        initialValues={params}
        render={({ handleSubmit, invalid }) => (
          <StyledForm onSubmit={handleSubmit}>
            <Typography variant="h6">{t("addGridRowComponent")}</Typography>

            <div>
              <TextField name="columnSpacing" label={t("columnSpacing")} className="field" type="number" />

              <Select
                name="direction"
                label={t("direction")}
                data={[
                  { label: "row", value: "row" },
                  { label: "column", value: "column" },
                ]}
                required
              />

              <Select
                name="justifyContent"
                label={t("justifyContent")}
                data={[
                  { label: "flex-start", value: "flex-start" },
                  { label: "center", value: "center" },
                  { label: "flex-end", value: "flex-end" },
                ]}
                required
              />

              <Select
                name="alignItems"
                label={t("alignItems")}
                data={[
                  { label: "flex-start", value: "flex-start" },
                  { label: "center", value: "center" },
                  { label: "flex-end", value: "flex-end" },
                ]}
                required
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
