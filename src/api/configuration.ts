import { defaultRequest } from "helpers";
import { IGetHtmlFormOrViewnameRequest } from "apps/security/configuration/configurations-new/store/types";
import { IGetAllResponse } from "types";

const getHtmlFormOrViewname = async (requestData: IGetHtmlFormOrViewnameRequest) => {
  return await defaultRequest.post<IGetAllResponse>(`api/jwt/CodiumSystem/Operation/GetHtmlFormOrViewname`, {
    kv: requestData,
  });
};

export const configurationApi = {
  getHtmlFormOrViewname,
};
