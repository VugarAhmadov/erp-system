import { Paper, Typography, DialogContent, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AppState } from "store";
import { closeDialog, setDialogSize } from "../../store";
import { StyledDialog } from "./add-form-dialog.styled";
import { DialogConfig } from "./components";

export const AddFormDialog = () => {
  const dispatch = useDispatch();
  const [gridView, setGridView] = useState("off");

  const opened = useSelector((state: AppState) => state.configurationsNew.dialog.opened);
  const selectedOperation = useSelector((state: AppState) => state.configurationsNew.selectedOperation);

  const { t } = useTranslation("common");

  const handleClose = (event: any, reason: "backdropClick" | "escapeKeyDown" | "closeButtonClick") => {
    if (reason && (reason === "backdropClick" || reason === "escapeKeyDown")) return;
    dispatch(closeDialog());
  };

  return (
    <DndProvider backend={HTML5Backend}>
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
            <Paper {...rest}>{children}</Paper>
            <DialogConfig
              dialogSize={selectedOperation.dialogSize}
              gridView={gridView}
              onDialogSizeChange={(dialogSize) => dispatch(setDialogSize(dialogSize))}
              onGridViewChange={(gridView) => setGridView(gridView)}
            />
          </>
        )}
      >
        <DialogContent>
          <div className="form-header">
            <Typography variant="h5">{t("addForm")}</Typography>
            <div className="action-buttons">
              {/* <Button
                  onClick={() =>
                    onSubmit({
                      operationHtml: JSON.stringify({ formElements, dialogSize: dialogSize }),
                      operationId: selectedOperation.id,
                    })
                  }
                  className="submit-btn"
                >
                  {t("submit")}
                </Button> */}
              <Button onClick={() => handleClose({}, "closeButtonClick")} variant="outlined">
                {t("close")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </StyledDialog>
    </DndProvider>
  );
};
