import { IMainLoading } from "types";

export interface ILoading extends IMainLoading {}

export interface IAddOrEditApplicationRequest {
  nameAz: string;
  nameEn: string;
  nameRu: string;
  shortNameAz: string;
  shortNameEn: string;
  shortNameRu: string;
  icon: string;
  url: string;
  parentId: string;
  id?: string;
}
