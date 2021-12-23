import { IMainLoading } from "types";

export interface ILoading extends IMainLoading {
  addColumn: boolean;
  editColumn: boolean;
  removeColumn: boolean;
}

export interface IAddTableRequest {
  name: string;
  createViewChecked?: "1";
  createDefaultOperation?: "1";
  applicationId?: string;
}

export interface IEditTableRequest {
  oldName: string;
  newName: string;
}

export interface IAddColumnRequest {
  tableName: string;
  columnName: string;
  columnType: string;
}

export interface IEditColumnRequest {
  tableName: string;
  oldFieldName: string;
  oldFieldType: string;
  fieldName: string;
  fieldType: string;
}

export interface IRemoveColumnRequest {
  tableName: string;
  columnName: string;
  columnType: string;
}
