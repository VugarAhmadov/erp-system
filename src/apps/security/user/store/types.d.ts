import { IMainLoading } from "types";

export interface ILoading extends IMainLoading {
  getHtmlFormOrViewname: boolean;
  addHtmlForm: boolean;
}

export interface IAddOrEditUserRequest {
  nameAz: string;
  nameEn: string;
  nameRu: string;
  icon: string;
  url: string;
  code: string;
  operationName: string;
  moduleId: string;
  viewName?: string;
  entity: string;
  id?: string;
}
