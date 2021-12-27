import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeDialog } from "./store";
import { AppState } from "store";
import { Dialog } from "./dialog";

export const Dialogs: FC = ({}) => {
  const dispatch = useDispatch();
  const dialogs = useSelector((state: AppState) => state.dialogs);

  const handleDialogClose = (id: number) => {
    // dispatch(closeDialog(id));
    dispatch(removeDialog(id));
  };

  return (
    <>
      {dialogs?.map((dialog, index) => (
        <Dialog key={index} {...dialog} id={dialog.id} onClose={handleDialogClose} />
      ))}
    </>
  );
};
