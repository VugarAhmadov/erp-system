import React, { FC } from "react";
import { DialogContent } from "@mui/material";
import { IDialog } from "./types";
import { StyledDialog } from "./dialog.styled";

export const Dialog: FC<IDialog> = ({ open, id, content, title, onClose, ...rest }) => {
  return (
    <StyledDialog {...rest} open={open} onClose={() => onClose(id)}>
      {/* <DialogTitle style={{ cursor: "move" }}>{title}</DialogTitle> */}
      <DialogContent>{content}</DialogContent>
      {/* <MaterialDialogActions>
        <Button autoFocus color="primary" onClick={() => onClose(id)}>
          Cancel
        </Button>
      </MaterialDialogActions> */}
    </StyledDialog>
  );
};
