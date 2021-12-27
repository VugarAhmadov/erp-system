import { defaultRequest } from "helpers";
import { IGetAllResponse } from "types";
import { IAddOrEditOperationRequest } from "apps/security/operation/store/types";

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

export const operationApi = {
  getAll,
  add,
  edit,
  remove,
};