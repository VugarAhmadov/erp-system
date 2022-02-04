import { defaultRequest } from "helpers";
import { IGetHtmlFormOrViewnameRequest, IOperation } from "apps/security/configuration/configurations-new/store/types";
import { IGetAllResponse } from "types";

const getHtmlFormOrViewname = async (requestData: IGetHtmlFormOrViewnameRequest) => {
  return await defaultRequest.post<IGetAllResponse<IOperation>>(
    `api/jwt/CodiumSystem/Operation/GetHtmlFormOrViewname`,
    {
      kv: requestData,
    }
  );
};

export const configurationApi = {
  getHtmlFormOrViewname,
};
