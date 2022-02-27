import React, { useState } from "react";
import { Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "store";
import { closeDialog, setDialogSize } from "../../store";
import { StyledDialog } from "./html-form-dialog.styled";
import { DialogConfig, DialogContent } from "./components";
import { addHtmlForm } from "apps/security/operation/store/actions";

export const HtmlFormDialog = () => {
  const dispatch = useDispatch();
  const [gridView, setGridView] = useState("off");

  const opened = useSelector((state: AppState) => state.configurations.htmlFormDialogOpened);
  const selectedOperation = useSelector((state: AppState) => state.configurations.selectedOperationHtmlForm);

  const handleClose = (event: any, reason: "backdropClick" | "escapeKeyDown" | "closeButtonClick") => {
    if (reason && (reason === "backdropClick" || reason === "escapeKeyDown")) return;
    dispatch(closeDialog());
  };

  const handleSubmit = () => {
    dispatch(
      addHtmlForm({
        operationHtml: JSON.stringify({
          formContent: selectedOperation.formContent,
          dialogSize: selectedOperation.dialogSize,
        }),
        operationId: selectedOperation.id,
      })
    );
  };

  return (
    <StyledDialog
      open={opened}
      onClose={handleClose}
      aria-labelledby="Add-form-dialog"
      aria-describedby="Add-form-dialog"
      fullWidth
      maxWidth={selectedOperation.dialogSize}
      scroll="paper"
      PaperComponent={({ children, ...rest }) => (
        <>
          <Paper {...rest}>
            <DialogContent
              onClose={() => handleClose({}, "closeButtonClick")}
              onSubmit={handleSubmit}
              gridView={gridView}
            />
          </Paper>
          <DialogConfig
            dialogSize={selectedOperation.dialogSize}
            gridView={gridView}
            onDialogSizeChange={(dialogSize) => dispatch(setDialogSize(dialogSize))}
            onGridViewChange={(gridView) => setGridView(gridView)}
          />
        </>
      )}
    />
  );
};
