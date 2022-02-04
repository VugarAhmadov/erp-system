import { DialogTitle, Icon, IconButton } from "@mui/material";
import React from "react";

interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

export const ModalTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Icon>close</Icon>
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};
