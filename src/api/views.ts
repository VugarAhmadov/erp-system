import { defaultRequest } from "helpers";
import { IAddOrEditViewRequest } from "apps/security/configuration/views/store/types";
import { IDispatcherResponse, IObject } from "types";

const getAll = async () => {
  return await defaultRequest.post<IObject[]>("api/jwt/views");
};

const add = async (requestData: IAddOrEditViewRequest) => {
  const { viewName, viewScript } = requestData;

  return await defaultRequest.post<IDispatcherResponse<null>>(`api/jwt/generateView/${viewName}/ADD`, {
    viewScript,
  });
};

const edit = async (requestData: IAddOrEditViewRequest) => {
  const { viewName, oldName, viewScript } = requestData;

  return await defaultRequest.post<IDispatcherResponse<null>>(`api/jwt/generateView/${viewName}/EDIT`, {
    oldName,
    viewScript,
  });
};

const remove = async (viewName: string) => {
  return await defaultRequest.post<IDispatcherResponse<null>>(`api/jwt/generateView/${viewName}/REMOVE`, {});
};

const getScript = async (viewName: string) => {
  return await defaultRequest.post<IDispatcherResponse<string>>(`api/jwt/view/${viewName}/script`);
};

export const viewsApi = {
  getAll,
  add,
  edit,
  remove,
  getScript,
};
