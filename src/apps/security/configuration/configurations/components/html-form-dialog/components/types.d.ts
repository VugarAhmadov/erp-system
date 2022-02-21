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
