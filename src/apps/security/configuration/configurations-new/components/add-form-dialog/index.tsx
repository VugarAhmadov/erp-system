import { Paper, Typography, DialogContent, Button } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Form } from "react-final-form";
import clsx from "clsx";
import { AppState } from "store";
import { closeDialog, setDialogSize, setFormContent } from "../../store";
import { StyledDialog } from "./add-form-dialog.styled";
import { DialogConfig } from "./components";
import { Components } from "./components/dialog-config/constants";

export const AddFormDialog = () => {
  const dispatch = useDispatch();
  const [gridView, setGridView] = useState("off");

  const opened = useSelector((state: AppState) => state.configurationsNew.dialogOpened);
  const selectedOperation = useSelector((state: AppState) => state.configurationsNew.selectedOperation);

  const { t } = useTranslation("common");

  const handleClose = (event: any, reason: "backdropClick" | "escapeKeyDown" | "closeButtonClick") => {
    if (reason && (reason === "backdropClick" || reason === "escapeKeyDown")) return;
    dispatch(closeDialog());
  };

  const handleSubmit = () => {
    // onSubmit({
    //   operationHtml: JSON.stringify({ formElements, dialogSize: dialogSize }),
    //   operationId: selectedOperation.id,
    // })
  };

  const [{ isOver, canDrop }, dropContainer] = useDrop(
    () => ({
      accept: Components.GRID,
      drop(item: any, monitor) {
        console.log("test123");
        dispatch(
          setFormContent([
            ...selectedOperation?.formContent,
            {
              index: selectedOperation?.formContent?.length,
              type: "grid-row",
              columns: [],
            },
          ])
        );
        return undefined;
      },
      // collect: (monitor) => ({
      //   isOver: monitor.isOver(),
      //   isOverCurrent: monitor.isOver({ shallow: true }),
      //   canDrop: monitor.canDrop(),
      // }),
    }),
    [selectedOperation?.formContent]
  );

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
            <Button onClick={handleSubmit} className="submit-btn">
              {t("submit")}
            </Button>
            <Button onClick={() => handleClose({}, "closeButtonClick")} variant="outlined">
              {t("close")}
            </Button>
          </div>
        </div>
        <div ref={dropContainer} className={clsx("form-body", gridView === "on" && "grid-view")}>
          <Form
            onSubmit={() => {}}
            render={({ values }) => (
              <form onSubmit={() => {}}>
                {selectedOperation?.formContent?.map((row: any) => (
                  <div key={row.index}>test123 - {row.index}</div>
                ))}
                {/* {content.map((row) => (
                    <GridRow
                      grid={row}
                      key={row.index}
                      onColumnAdd={handleColumnAdd}
                      onComponentAdd={handleComponentAdd}
                      onGridRowDelete={handleGridRowDelete}
                      onGridColumnDelete={handleGridColumnDelete}
                      onElementDelete={handleElementDelete}
                      onElementEdit={handleDialogOpen}
                    />
                  ))} */}
              </form>
            )}
          />
        </div>
      </DialogContent>
    </StyledDialog>
  );
};
