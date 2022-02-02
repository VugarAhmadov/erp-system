import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { StyledDialog } from "./add-form-dialog.styled";

export const AddFormDialog = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch();
  // }, []);

  return (
    <h1>test</h1>
    // <StyledDialog
    //   open={dialog.opened}
    //   onClose={onClose}
    //   aria-labelledby="Add-form-dialog"
    //   aria-describedby="Add-form-dialog"
    //   fullWidth={true}
    //   maxWidth={dialog.type === "add" ? dialogSize : "sm"}
    //   scroll="paper"
    //   PaperComponent={({ children, ...rest }) => (
    //     <>
    //       <Paper {...rest}>{children}</Paper>
    //       {dialog.type === "add" && (
    //         <DialogConfig
    //           dialogSize={dialogSize}
    //           gridView={gridView}
    //           onDialogSizeChange={handleDialogSizeChange}
    //           onGridViewChange={handleGridViewChange}
    //         />
    //       )}
    //     </>
    //   )}
    // ></StyledDialog>
  );
};
