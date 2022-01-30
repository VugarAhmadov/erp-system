import { Breakpoint } from "@mui/material";

export interface IAddForm {
  onClose(): void;
  onSubmit(data: any): void;
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
  image: boolean;
  table: boolean;
  tab: boolean;
}

export interface IDialogStateData {
  type: string;
  rowIndex: number;
  columnIndex: number;
  params: any;
  operationId: string;
}
