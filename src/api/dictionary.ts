import { defaultRequest } from "helpers";
import { IGetAllResponse } from "types";

const getDictionaryTypeList = async () => {
  return await defaultRequest.post<IGetAllResponse>("api/jwt/CodiumSystem/Dictionary/GetDictionaryTypeList");
};

export const dictionaryApi = { getDictionaryTypeList };
