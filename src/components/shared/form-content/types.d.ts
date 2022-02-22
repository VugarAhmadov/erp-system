export interface IRow {
  id: number;
  parentId: number;
  type: "row";
  children: ICloumn[];
}

export interface ICloumn {
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
  rowSpacing: number;
  columnSpacing: number;
  direction: "row" | "column";
  justifyContent: "flex-start" | "center" | "flex-end";
  alignItems: "flex-start" | "center" | "flex-end";
}
