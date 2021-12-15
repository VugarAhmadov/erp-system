import { defaultRequest } from "helpers";
import { IView } from "apps/security/configuration/store/types";

const getViews = async () => {
  return await defaultRequest.post<IView[]>("api/jwt/views");
};

export const configurationApi = {
  getViews,
};
