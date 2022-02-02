import { Paper } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "store";
import { setDialog } from "../../store";
import { StyledDialog } from "./add-form-dialog.styled";

export const AddFormDialog = () => {
  const dispatch = useDispatch();
  const opened = useSelector((state: AppState) => state.configurationsNew.dialog.opened);
  // useEffect(() => {
  //   dispatch();
  // }, []);

  return (
    <StyledDialog
      open={opened}
      onClose={() => dispatch(setDialog({ type: "", opened: false }))}
      aria-labelledby="Add-form-dialog"
      aria-describedby="Add-form-dialog"
      fullWidth={true}
      // maxWidth={dialog.type === "add" ? dialogSize : "sm"}
      scroll="paper"
      PaperComponent={({ children, ...rest }) => (
        <>
          <Paper {...rest}>{children}</Paper>
          {/* <DialogConfig
              dialogSize={dialogSize}
              gridView={gridView}
              onDialogSizeChange={handleDialogSizeChange}
              onGridViewChange={handleGridViewChange}
            /> */}
        </>
      )}
    ></StyledDialog>
  );
};
