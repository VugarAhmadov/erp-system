import { Breakpoint } from "@mui/material";

export interface IAddForm {
  onClose(): void;
  onSubmit(data: any): void;
  size: Breakpoint;
  setSize(size: Breakpoint): void;
}

export interface IDialogState {
  open: IDialogOpen;
  data: IDialogStateData | null;
}

export interface IDialogOpen {
  input: boolean;
  select: boolean;
  checkbox: boolean;
  label: boolean;
  radio: boolean;
  datepicker: boolean;
  button: boolean;
}

export interface IDialogStateData {
  type: string;
  index: number;
  params: any;
  operationId: string;
}
