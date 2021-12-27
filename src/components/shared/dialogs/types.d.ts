import React, { ReactNode } from "react";
import { DialogProps } from "@mui/material";

export interface IDialog extends Omit<DialogProps, "onClose"> {
  id: number;
  onClose(id: number): void;
  content: JSX.Element;
}

export interface IDialogHookProps extends Omit<IDialog, "id" | "open" | "onClose"> {}
