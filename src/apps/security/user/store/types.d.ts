import { IMainLoading } from "types";

export interface ILoading extends IMainLoading {}

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
  photoFileId: string;
  id?: string;
}
