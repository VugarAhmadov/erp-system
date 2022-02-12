import { defaultRequest } from "helpers";
import { IGetAllResponse } from "types";
import { IAddOrEditApplicationRequest } from "apps/security/application/store/types";

const getAll = async (url: string) => {
  return await defaultRequest.post<IGetAllResponse<any>>(`api${url}`);
};

const get = async (url: string, id: string) => {
  return await defaultRequest.post<IGetAllResponse<any>>(`api${url}`, { kv: { id } });
};

const add = async (url: string, data: any) => {
  return await defaultRequest.post<IGetAllResponse<any>>(`api${url}`, {
    kv: data,
  });
};

const edit = async (url: string, data: any) => {
  return await defaultRequest.post<IGetAllResponse<any>>(`api${url}`, {
    kv: data,
  });
};

const remove = async (url: string, id: string) => {
  return await defaultRequest.post<IGetAllResponse<any>>(`api${url}`, { kv: { id } });
};

export const dynamicApi = {
  getAll,
  get,
  add,
  edit,
  remove,
};
