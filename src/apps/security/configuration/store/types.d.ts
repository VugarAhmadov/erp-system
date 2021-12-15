export interface ILoading {
  getViews: boolean;
  getTables: boolean;
}

export interface IView {
  name: string;
  columns: IViewColumn[];
  operations: IViewOperations;
}

export interface IViewColumn {
  name: string;
  // 1-text 2-bigint 3-timestamp 4-smallint 5-int
  type: "1" | "2" | "3" | "4" | "5";
}

export interface IViewOperations {
  addMethod: string;
  deleteMethod: string;
  editMethod: string;
  modelName: string;
  tablename: string;
  viewMethod: string;
  viewName: string;
}

export interface IViewInsertRequest {
  oldName: string;
  viewScript: string;
}
