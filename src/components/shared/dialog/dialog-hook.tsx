import React, { FC } from "react";
import { useTranslator } from "localization";
import { useStyles } from "./modal.style";
import {
  Button,
  Dialog,
  DialogActions as MaterialDialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
} from "@material-ui/core";
import { connect, useDispatch, useSelector } from "react-redux";
import { IAppState } from "store/state/reducers";
import { DialogActions } from "store/actions/dialog.action";

const Modal: FC<IModal> = ({ open, id, content, title, onClose }) => {
  const lang = useTranslator();
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={() => onClose(id)} PaperComponent={Paper}>
      <DialogTitle style={{ cursor: "move" }}>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <MaterialDialogActions>
        <Button autoFocus color="primary" onClick={() => onClose(id)}>
          Cancel
        </Button>
      </MaterialDialogActions>
    </Dialog>
  );
};

export const ModalProvider: FC = ({ children }) => {
  const dispatch = useDispatch();
  const state = useSelector((state: IAppState) => state.dialog);

  return (
    <>
      {children}
      {state.dialogs?.map((d, i) => (
        <Modal key={i} {...d} id={d.id} onClose={(id) => dispatch(DialogActions.removeDialog(id))} />
      ))}
    </>
  );
};

interface IDialogProps {
  title?: string;
  content?: any;
}

export const useModal = () => {
  const dispatch = useDispatch();
  let a = 0;

  const openDialog = (props?: IDialogProps) => {
    dispatch(DialogActions.addDialog({ ...props, id: a++, open: true }));
  };

  return {
    open: openDialog,
  };
};
