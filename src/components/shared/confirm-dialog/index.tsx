import { FC } from "react";
import { DialogContent, DialogTitle, DialogActions } from "@mui/material";
import { Button } from "components/shared";
import { StyledDialog } from "./confirm-dialog.styled";
import { useTranslation } from "react-i18next";

interface IConfirmDialog {
  open: boolean;
  onClose(): void;
  onConfirm(): void;
  title: string;
  content: string;
  confirmLoading: boolean;
}

export const ConfirmDialog: FC<IConfirmDialog> = ({ open, onClose, onConfirm, content, title, confirmLoading }) => {
  const { t } = useTranslation("common");

  return (
    <StyledDialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          {t("cancel")}
        </Button>
        <Button onClick={onConfirm} variant="contained" loading={confirmLoading}>
          {t("confirm")}
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};
