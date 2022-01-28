import React, { FC, memo, useState } from "react";
import { Breakpoint, DialogContent, Paper } from "@mui/material";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
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

export const Dialog: FC<IDialogProps> = memo(({ dialog, onClose, onAddFormSubmit, onAllViewFormSubmit }) => {
  const [dialogSize, setDialogSize] = useState<Breakpoint>("sm");

  console.log(dialogSize);

  return (
    <StyledDialog
      open={dialog.opened}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
      maxWidth={dialog.type === "add" ? dialogSize : "sm"}
      scroll="paper"
      // PaperComponent={({ children, ...rest }) => (
      //   <>
      //     <Paper {...rest}>{children}</Paper>
      //     <div style={{ width: "200px", height: "100%", backgroundColor: "#ccc" }}>test</div>
      //   </>
      // )}
    >
      <DialogContent>
        {dialog.type === "add" && (
          <DndProvider backend={HTML5Backend}>
            <AddForm
              onClose={onClose}
              onSubmit={onAddFormSubmit}
              dialogSize={dialogSize}
              setDialogSize={setDialogSize}
            />
          </DndProvider>
        )}
        {dialog.type === "all-view" && <AllViewForm onClose={onClose} onSubmit={onAllViewFormSubmit} />}
        {dialog.type === "add-priv" && <AddPrivForm />}
      </DialogContent>
    </StyledDialog>
  );
});
