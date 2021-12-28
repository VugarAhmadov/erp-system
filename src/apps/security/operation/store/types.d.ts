import { IMainLoading } from "types";

export interface ILoading extends IMainLoading {
  getHtmlFormOrViewname: boolean;
  addHtmlForm: boolean;
}

export interface IAddOrEditOperationRequest {
  nameAz: string;
  nameEn: string;
  nameRu: string;
  shortNameAz: string;
  shortNameEn: string;
  shortNameRu: string;
  icon: string;
  url: string;
  code: string;
  applicationId: string;
  parentId: string;
  id?: string;
}

export interface IGetHtmlFormOrViewnameRequest {
  lang: string;
  operationId: string;
}

export interface IAddHtmlFormRequest {
  operationHtml: string;
  operationId: string;
}
