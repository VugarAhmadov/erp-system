import { defaultRequest } from "helpers";
import { IGetAllResponse } from "types";
import { IAddOrEditModuleRequest } from "apps/security/module/store/types";

const getAll = async () => {
  return await defaultRequest.post<IGetAllResponse<any>>("api/jwt/CodiumSystem/Modul/AllView");
};

const add = async (requestData: IAddOrEditModuleRequest) => {
  return await defaultRequest.post<IGetAllResponse<any>>(`api/jwt/CodiumSystem/Modul/Add`, {
    kv: requestData,
  });
};

const edit = async (requestData: IAddOrEditModuleRequest) => {
  return await defaultRequest.post<IGetAllResponse<any>>(`api/jwt/CodiumSystem/Modul/Edit`, {
    kv: requestData,
  });
};

const remove = async (id: string) => {
  return await defaultRequest.post<IGetAllResponse<any>>(`api/jwt/CodiumSystem/Modul/Delete`, { kv: { id } });
};

export const moduleApi = {
  getAll,
  add,
  edit,
  remove,
};
