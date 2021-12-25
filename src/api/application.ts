import { defaultRequest } from "helpers";
import { IAddOrEditViewRequest } from "apps/security/configuration/views/store/types";
import { IGetAllResponse } from "types";

const getAll = async () => {
  return await defaultRequest.post<IGetAllResponse>("api/jwt/CodiumSystem/Application/AllView");
};

export const applicationApi = {
  getAll,
};
