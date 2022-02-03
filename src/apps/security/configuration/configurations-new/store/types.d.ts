import { Breakpoint } from "@mui/material";

export interface ILoading {
  getDictionaryTypeList: boolean;
  getHtmlFormOrViewname: boolean;
}

export interface IDictionyType {
  active: string;
  code: string;
  createDate: Date;
  createUserId: string;
  hiddenStatus: string;
  id: string;
  name: string;
  nameAz: string;
  nameEn: string;
  nameRu: string;
  showUserType: string;
  updateDate: string;
  updateUserId: string;
}

export interface IGetHtmlFormOrViewnameRequest {
  lang: string;
  operationId: string;
}

export interface IOperation {
  id: string;
  active: number;
  createDate: Date;
  createUserId: string;
  updateDate: Date;
  updateUserId: string;
  applicationId: string;
  applicationName: string;
  applicationNameAz: string;
  applicationNameEn: string;
  applicationNameRu: string;
  moduleId: string;
  moduleName: string;
  moduleNameAz: string;
  moduleNameEn: string;
  moduleNameRu: string;
  name: string;
  nameAz: string;
  nameEn: string;
  nameRu: string;
  code: string;
  operationHtml: string;
  seqColumns: string;
  url: string;
  viewName: string;
}

export interface IOperationHtml {
  formContent: any[];
  dialogSize: Breakpoint;
}

export interface IGetHtmlFormOrViewnameResponse {
  id: string;
  code: string;
  url: string;
  viewName: string;
  formContent: any[];
  dialogSize: Breakpoint;
}
