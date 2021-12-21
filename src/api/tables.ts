import { defaultRequest } from "helpers";
import { IObject } from "types";

const getAll = async () => {
  return await defaultRequest.post<IObject[]>("api/jwt/tables");
};

export const tablesApi = {
  getAll,
};
