export interface IDispatcherResponse<T> {
  code: ResponseStatus;
  data?: T;
  message: IMessage | string;
}

export type ResponseStatus = "OK" | "ERROR" | "UNAUTHORIZED";

export interface IMessage {
  az: string;
  en?: string;
  ru?: string;
}

export interface IMainLoading {
  getAll: boolean;
  add: boolean;
  edit: boolean;
  remove: boolean;
}

export interface IObject {
  name: string;
  columns: IColumn[];
  operations: IOperations;
}

export interface IColumn {
  name: string;
  // 1-text 2-bigint 3-timestamp 4-smallint 5-int
  type: "1" | "2" | "3" | "4" | "5";
}

export interface IOperations {
  addMethod: string;
  deleteMethod: string;
  editMethod: string;
  modelName: string;
  tablename: string;
  viewMethod: string;
  viewName: string;
}

export interface IDialog {
  type: "edit" | "add" | "all-view" | "add-priv" | "";
  opened: boolean;
}

export interface IGetAllResponse {
  err: any[];
  errMessage: any[];
  kv: any;
  tbl: IGetAllTable[];
}

export interface IGetAllTable {
  allRowCount: number;
  c: IGetAllTableColumn[];
  endLimit: number;
  hiddenColumn: string;
  r: any[];
  rowCount: number;
  seqColumn: string;
  startLimit: number;
  tn: string;
}

export interface IGetAllTableColumn {
  [key: string]: string;
  i: string;
  n: string;
  t: string;
}
