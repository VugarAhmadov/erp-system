import React, { FC, memo } from "react";
import { DialogContent } from "@mui/material";
import { StyledDialog } from "./dialog.styled";

interface IDialog {
  open: boolean;
  onClose(): void;
}

export const Dialog: FC<IDialog> = memo(({ children, open, onClose }) => {
  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
      maxWidth="xs"
      scroll="paper"
    >
      <DialogContent>{children}</DialogContent>
    </StyledDialog>
  );
});
