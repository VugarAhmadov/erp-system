import { defaultRequest } from "helpers";
import { IGetAllResponse } from "types";
import {
  IAddHtmlFormRequest,
  IAddOrEditOperationRequest,
  IAddViewFormRequest,
} from "apps/security/operation/store/types";
import { IGetHtmlFormOrViewnameRequest } from "apps/security/configuration/configurations-new/store/types";

const getAll = async () => {
  return await defaultRequest.post<IGetAllResponse>("api/jwt/CodiumSystem/Operation/AllView");
};

const add = async (requestData: IAddOrEditOperationRequest) => {
  return await defaultRequest.post<IGetAllResponse>(`api/jwt/CodiumSystem/Operation/Add`, {
    kv: requestData,
  });
};

const edit = async (requestData: IAddOrEditOperationRequest) => {
  return await defaultRequest.post<IGetAllResponse>(`api/jwt/CodiumSystem/Operation/Edit`, {
    kv: requestData,
  });
};

const remove = async (id: string) => {
  return await defaultRequest.post<IGetAllResponse>(`api/jwt/CodiumSystem/Operation/Delete`, { kv: { id } });
};

const addHtmlForm = async (requestData: IAddHtmlFormRequest) => {
  return await defaultRequest.post<IGetAllResponse>(`api/jwt/CodiumSystem/Operation/OperationHtmlForm`, {
    kv: requestData,
  });
};

const addViewForm = async (requestData: IAddViewFormRequest) => {
  return await defaultRequest.post<IGetAllResponse>(`api/jwt/CodiumSystem/Operation/OperationViewForm`, {
    kv: requestData,
  });
};

const getHtmlFormOrViewname = async (requestData: IGetHtmlFormOrViewnameRequest) => {
  return await defaultRequest.post<IGetAllResponse>(`api/jwt/CodiumSystem/Operation/GetHtmlFormOrViewname`, {
    kv: requestData,
  });
};

export const operationApi = {
  getAll,
  add,
  edit,
  remove,
  addHtmlForm,
  addViewForm,
  getHtmlFormOrViewname,
};
