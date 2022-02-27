export interface IRow {
  id: number;
  parentId: number;
  type: "row";
  params: IGridRowParams;
  children: IColumn[];
}

export interface IColumn {
  id: number;
  parentId: number;
  type: "column";
  params?: any;
  children: IRow[] | [IComponent];
}

export interface IComponent {
  id: number;
  parentId: number;
  type: "input";
  params?: any;
}

export interface IGridRowParams {
  columnSpacing: number;
  direction: "row" | "column";
  justifyContent: "flex-start" | "center" | "flex-end";
  alignItems: "flex-start" | "center" | "flex-end";
}

export interface IGridColumnParams {
  columnSize: number;
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
  fileUpload: boolean;
  profileImage: boolean;
}

export interface IDialogState {
  open: IDialogOpen;
}

export interface ITabParams {
  tabs?: ITabs[];
  label?: string;
}
