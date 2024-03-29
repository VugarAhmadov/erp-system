import { IMainLoading } from "types";

export interface ILoading extends IMainLoading {
  // getHtmlFormOrViewname: boolean;
  // addHtmlForm: boolean;
}

export interface IAddOrEditCommonOperationRequest {
  url: string;
  operationName: string;
  viewName?: string;
  entity: string;
  // id?: string;
}

export interface IGetHtmlFormOrViewnameRequest {
  lang: string;
  operationId: string;
}

export interface IAddHtmlFormRequest {
  operationHtml: string;
  operationId: string;
}

export interface IAddViewFormRequest {
  operationId: string;
  seqColumn: string;
  viewCode: string;
  viewName: string;
}
