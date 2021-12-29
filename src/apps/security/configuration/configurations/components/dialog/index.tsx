import React, { FC } from "react";
import { DialogContent } from "@mui/material";
import { IDialog } from "types";
import { AddForm, AddPrivForm, AllViewForm } from "..";
import { StyledDialog } from "./dialog.styled";
import { IAddHtmlFormRequest, IAddViewFormRequest } from "apps/security/operation/store/types";

interface IDialogProps {
  dialog: IDialog;
  onClose(): void;
  onAddFormSubmit(data: IAddHtmlFormRequest): void;
  onAllViewFormSubmit(data: IAddViewFormRequest): void;
  selectedOperation?: string;
}

export const Dialog: FC<IDialogProps> = ({ dialog, onClose, onAddFormSubmit, onAllViewFormSubmit }) => {
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
        {dialog.type === "add" && <AddForm onClose={onClose} onSubmit={onAddFormSubmit} />}
        {dialog.type === "all-view" && <AllViewForm onClose={onClose} onSubmit={onAllViewFormSubmit} />}
        {dialog.type === "add-priv" && <AddPrivForm />}
      </DialogContent>
    </StyledDialog>
  );
};
