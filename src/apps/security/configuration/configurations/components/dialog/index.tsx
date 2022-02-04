import React, { FC, memo, useState } from "react";
import { Breakpoint, DialogContent, Paper } from "@mui/material";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { IDialog } from "types";
import { AddForm, AddPrivForm, AllViewForm, DialogConfig } from "..";
import { StyledDialog } from "./dialog.styled";
import { IAddHtmlFormRequest, IAddViewFormRequest } from "apps/security/operation/store/types";
import { AddFormNew } from "../add-form-new";

interface IDialogProps {
  dialog: IDialog;
  onClose(): void;
  onAddFormSubmit(data: IAddHtmlFormRequest): void;
  onAllViewFormSubmit(data: IAddViewFormRequest): void;
  selectedOperation?: string;
}

export const Dialog: FC<IDialogProps> = memo(({ dialog, onClose, onAddFormSubmit, onAllViewFormSubmit }) => {
  const [dialogSize, setDialogSize] = useState<Breakpoint>("sm");
  const [gridView, setGridView] = useState<"on" | "off">("off");

  const handleDialogSizeChange = (size: Breakpoint) => setDialogSize(size);
  const handleGridViewChange = (gridView: "on" | "off") => setGridView(gridView);

  return (
    <DndProvider backend={HTML5Backend}>
      <StyledDialog
        open={dialog.opened}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth={dialog.type === "add" ? dialogSize : "sm"}
        scroll="paper"
        PaperComponent={({ children, ...rest }) => (
          <>
            <Paper {...rest}>{children}</Paper>
            {dialog.type === "add" && (
              <DialogConfig
                dialogSize={dialogSize}
                gridView={gridView}
                onDialogSizeChange={handleDialogSizeChange}
                onGridViewChange={handleGridViewChange}
              />
            )}
          </>
        )}
      >
        <DialogContent>
          {dialog.type === "add" && <AddFormNew onClose={onClose} gridView={gridView} />}
          {/* {dialog.type === "add" && (
            <AddForm
              onClose={onClose}
              onSubmit={onAddFormSubmit}
              dialogSize={dialogSize}
              setDialogSize={setDialogSize}
            />
          )} */}
          {dialog.type === "all-view" && <AllViewForm onClose={onClose} onSubmit={onAllViewFormSubmit} />}
          {dialog.type === "add-priv" && <AddPrivForm />}
        </DialogContent>
      </StyledDialog>
    </DndProvider>
  );
});
