import { defaultRequest } from "helpers";
import { IAddViewRequest, IEditViewRequest, IView } from "apps/security/configuration/store/types";
import { IDispatcherResponse } from "types";

const getViews = async () => {
  return await defaultRequest.post<IView[]>("api/jwt/views");
};

const getTables = async () => {
  return await defaultRequest.post<IView[]>("api/jwt/tables");
};

const getViewScript = async (viewName: string) => {
  return await defaultRequest.post<IDispatcherResponse<string>>(`api/jwt/view/${viewName}/script`);
};

const editView = async (requestData: IEditViewRequest) => {
  const { viewName, oldName, viewScript } = requestData;

  return await defaultRequest.post<IDispatcherResponse<null>>(`api/jwt/generateView/${viewName}/EDIT`, {
    oldName,
    viewScript,
  });
};

const addView = async (requestData: IAddViewRequest) => {
  const { viewName, viewScript } = requestData;

  return await defaultRequest.post<IDispatcherResponse<null>>(`api/jwt/generateView/${viewName}/ADD`, {
    viewScript,
  });
};

const deleteView = async (viewName: string) => {
  return await defaultRequest.post<IDispatcherResponse<null>>(`api/jwt/generateView/${viewName}/REMOVE`, {});
};

export const configurationApi = {
  getViews,
  getTables,
  getViewScript,
  editView,
  addView,
  deleteView,
};
