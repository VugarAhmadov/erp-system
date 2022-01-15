import { defaultRequest } from "helpers";
import { IGetAllResponse, IGetDictionariesListByCommon } from "types";

const getDictionaryTypeList = async () => {
  return await defaultRequest.post<IGetAllResponse>("api/jwt/CodiumSystem/Dictionary/GetDictionaryTypeList");
};

const getDictionariesListByCommon = async (requestData: IGetDictionariesListByCommon) => {
  return await defaultRequest.post<IGetAllResponse>("api/jwt/CodiumSystem/Dictionary/GetDictionariesListByCommon", {
    kv: requestData,
  });
};

export const dictionaryApi = { getDictionaryTypeList, getDictionariesListByCommon };
