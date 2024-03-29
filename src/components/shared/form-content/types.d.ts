export interface IRow {
  id: string;
  parentId: string;
  type: "row";
  params: IGridRowParams;
  children: IColumn[];
}

export interface IColumn {
  id: string;
  parentId: string;
  type: "column";
  params: IGridColumnParams;
  children: IRow[] | [IComponent];
}

export interface IComponent {
  id: string;
  parentId: string;
  type: "input";
  params?: any;
}

export interface IGridRowParams {
  columnSpacing: number;
  direction: "row" | "column";
  justifyContent: "flex-start" | "center" | "flex-end";
  alignItems: "flex-start" | "center" | "flex-end";
  width: string;
  height: string;
  marginBottom: string;
  marginTop: string;
}

export interface IGridColumnParams {
  columnSize: number;
  direction: "row" | "column";
  justifyContent: "flex-start" | "center" | "flex-end";
  alignItems: "flex-start" | "center" | "flex-end";
  height: string;
  marginBottom: string;
  marginTop: string;
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
  orientation?: "horizontal" | "vertical";
}
