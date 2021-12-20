import { IMainLoading } from "types";

export interface ILoading extends IMainLoading {
  getScript: boolean;
}

export interface IAddOrEditViewRequest {
  oldName: string;
  viewName: string;
  viewScript: string;
}
