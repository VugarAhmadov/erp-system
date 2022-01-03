import { defaultRequest } from "helpers";
import { IGetAllResponse } from "types";
import { IAddOrEditApplicationRequest } from "apps/security/application/store/types";

const getAll = async (url: string) => {
  return await defaultRequest.post<IGetAllResponse>(`api${url}`);
};

const add = async (requestData: IAddOrEditApplicationRequest) => {
  return await defaultRequest.post<IGetAllResponse>(`api/jwt/CodiumSystem/Application/Add`, {
    kv: requestData,
  });
};

const edit = async (requestData: IAddOrEditApplicationRequest) => {
  return await defaultRequest.post<IGetAllResponse>(`api/jwt/CodiumSystem/Application/Edit`, {
    kv: requestData,
  });
};

const remove = async (id: string) => {
  return await defaultRequest.post<IGetAllResponse>(`api/jwt/CodiumSystem/Application/Delete`, { kv: { id } });
};

export const dynamicApi = {
  getAll,
  add,
  edit,
  remove,
};
