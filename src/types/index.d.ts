import { Breakpoint } from "@mui/material";

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
  get?: boolean;
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
  type: "edit" | "add" | "all-view" | "add-priv" | "confirm" | "";
  opened: boolean;
  selectedDataId?: string | null;
}

export interface IGetAllResponse<R> {
  err: any[];
  errMessage: any[];
  kv: any;
  tbl: IGetAllTable<R>[];
}

export interface IGetAllTable<R> {
  allRowCount: number;
  c: IGetAllTableColumn[];
  endLimit: number;
  hiddenColumn: string;
  r: R[];
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

export interface ISelectData {
  value: string;
  label: string;
}

export interface IGetDictionariesListByCommon {
  typeId: string;
  parentId?: string;
  lang?: string;
}
