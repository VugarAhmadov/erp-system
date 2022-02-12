export interface IRow {
  id: number;
  parentId: number;
  index: number;
  type: "row";
  params?: any;
  children: ICloumn[];
}

export interface ICloumn {
  id: number;
  parentId: number;
  index: number;
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
