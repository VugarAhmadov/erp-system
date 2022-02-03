import { defaultRequest } from "helpers";
import { IGetAllResponse } from "types";
import { IAddOrEditApplicationRequest } from "apps/security/application/store/types";

const getAll = async (url: string) => {
  return await defaultRequest.post<IGetAllResponse<any>>(`api${url}`);
};

const add = async (url: string, requestData: IAddOrEditApplicationRequest) => {
  return await defaultRequest.post<IGetAllResponse<any>>(`api${url}`, {
    kv: requestData,
  });
};

const edit = async (requestData: IAddOrEditApplicationRequest) => {
  return await defaultRequest.post<IGetAllResponse<any>>(`api/jwt/CodiumSystem/Application/Edit`, {
    kv: requestData,
  });
};

const remove = async (id: string) => {
  return await defaultRequest.post<IGetAllResponse<any>>(`api/jwt/CodiumSystem/Application/Delete`, { kv: { id } });
};

export const dynamicApi = {
  getAll,
  add,
  edit,
  remove,
};
