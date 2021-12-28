import React, { FC } from "react";
import { DialogContent } from "@mui/material";
import { IDialog } from "types";
import { AddForm, AddPrivForm, AllViewForm } from "..";
import { StyledDialog } from "./dialog.styled";

interface IDialogProps {
  dialog: IDialog;
  onClose(): void;
  onSubmit(data: any): void;
  selectedOperation?: string;
}

export const Dialog: FC<IDialogProps> = ({ dialog, onClose }) => {
  return (
    <StyledDialog
      open={dialog.opened}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
      maxWidth="sm"
      scroll="paper"
    >
      <DialogContent>
        {dialog.type === "add" && <AddForm />}
        {dialog.type === "all-view" && <AllViewForm />}
        {dialog.type === "add-priv" && <AddPrivForm />}
      </DialogContent>
    </StyledDialog>
  );
};
