import { defaultRequest } from "helpers";
import { IView } from "apps/security/configuration/store/types";

const getViews = async () => {
  return await defaultRequest.post<IView[]>("api/jwt/views");
};

const getTables = async () => {
  return await defaultRequest.post<IView[]>("api/jwt/tables");
};

export const configurationApi = {
  getViews,
  getTables,
};
