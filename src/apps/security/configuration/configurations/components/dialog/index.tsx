import React, { FC, useState } from "react";
import { Breakpoint, DialogContent } from "@mui/material";
import { IDialog } from "types";
import { AddForm, AddPrivForm, AllViewForm } from "..";
import { StyledDialog } from "./dialog.styled";
import { IAddHtmlFormRequest, IAddViewFormRequest } from "apps/security/operation/store/types";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface IDialogProps {
  dialog: IDialog;
  onClose(): void;
  onAddFormSubmit(data: IAddHtmlFormRequest): void;
  onAllViewFormSubmit(data: IAddViewFormRequest): void;
  selectedOperation?: string;
}

export const Dialog: FC<IDialogProps> = ({ dialog, onClose, onAddFormSubmit, onAllViewFormSubmit }) => {
  const [dialogSize, setDialogSize] = useState<Breakpoint>("sm");

  return (
    <StyledDialog
      open={dialog.opened}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
      maxWidth={dialogSize}
      scroll="paper"
    >
      <DialogContent>
        {dialog.type === "add" && (
          <DndProvider backend={HTML5Backend}>
            <AddForm onClose={onClose} onSubmit={onAddFormSubmit} size={dialogSize} setSize={setDialogSize} />
          </DndProvider>
        )}
        {dialog.type === "all-view" && <AllViewForm onClose={onClose} onSubmit={onAllViewFormSubmit} />}
        {dialog.type === "add-priv" && <AddPrivForm />}
      </DialogContent>
    </StyledDialog>
  );
};
