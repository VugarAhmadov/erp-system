import { defaultRequest } from "helpers";

const getAllTables = async () => {
  return await defaultRequest.post<IView[]>("api/jwt/tables");
};

export const viewApi = {
  getAllTables,
};
