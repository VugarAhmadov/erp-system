import React, { FC } from "react";
import { Button, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import { Select } from "components/shared";
import { Dialog } from "../../dialog";
import { StyledForm } from "./grid-column-dialog.styled";
import { IGridColumnParams } from "../../types";

interface IGridColumnDialog {
  open: boolean;
  onClose(): void;
  onSubmit(data: IGridColumnParams): void;
  params: IGridColumnParams;
}

export const GridColumnDialog: FC<IGridColumnDialog> = ({ open, onClose, onSubmit, params }) => {
  const { t } = useTranslation("common");

  return (
    <Dialog open={open} onClose={onClose}>
      <Form
        onSubmit={onSubmit}
        initialValues={params}
        render={({ handleSubmit, invalid }) => (
          <StyledForm onSubmit={handleSubmit}>
            <Typography variant="h6">{t("addGridColumnComponent")}</Typography>

            <div>
              <Select
                name="columnSize"
                label={t("columnSize")}
                data={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"].map((size) => ({
                  label: size,
                  value: size,
                }))}
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
