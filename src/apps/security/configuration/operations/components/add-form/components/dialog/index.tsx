import { DialogContent } from "@mui/material";
import { FC } from "react";
import { StyledDialog } from "./dialog.styled";

interface IDialog {
  open: boolean;
  onClose(): void;
}

export const Dialog: FC<IDialog> = ({ children, open, onClose }) => {
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
};
