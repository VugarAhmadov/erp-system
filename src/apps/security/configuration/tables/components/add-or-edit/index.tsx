import React, { FC } from "react";
import { Button, DialogContent } from "@mui/material";
import { StyledDialog } from "./add-or-edit.styled";
import { Form } from "react-final-form";
import { TextField } from "components/shared";
import { useTranslation } from "react-i18next";
import { IDialog } from "types";
import { useSelector } from "react-redux";
import { useValidators } from "hooks";

interface IAddOrEdit {
  dialog: IDialog;
  onClose(): void;
  onSubmit(data: any): void;
  selectedTable?: string;
}

export const AddOrEdit: FC<IAddOrEdit> = ({ dialog, onClose, onSubmit, selectedTable }) => {
  const { t } = useTranslation("common");
  const { required } = useValidators();

  return (
    <StyledDialog
      open={dialog.opened}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
      maxWidth="xs"
      scroll="paper"
    >
      <DialogContent>
        <Form
          onSubmit={onSubmit}
          initialValues={dialog.type === "edit" ? { name: selectedTable } : {}}
          render={({ handleSubmit, invalid }) => (
            <form onSubmit={handleSubmit}>
              <TextField name="name" label={t("tablename")} validate={required} />

              <div className="action-buttons">
                <Button onClick={onClose}>{t("back")}</Button>
                <Button type="submit" disabled={invalid}>
                  {t(dialog.type === "edit" ? "edit" : "add")}
                </Button>
              </div>
            </form>
          )}
        />
      </DialogContent>
    </StyledDialog>
  );
};
