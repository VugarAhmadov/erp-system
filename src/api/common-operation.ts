import { defaultRequest } from "helpers";
import { IGetAllResponse } from "types";
import { IAddOrEditCommonOperationRequest } from "apps/security/common-operation/store/types";

const getAll = async () => {
  return await defaultRequest.post<IGetAllResponse>("api/jwt/CodiumSystem/Operation/GetCommonPrivilegiya", {
    kv: {
      seqColumn: "url",
    },
  });
};

const add = async (requestData: IAddOrEditCommonOperationRequest) => {
  return await defaultRequest.post<IGetAllResponse>(`api/jwt/CodiumSystem/Operation/AddCommonPrivilegiya`, {
    kv: requestData,
  });
};

// const edit = async (requestData: IAddOrEditOperationRequest) => {
//   return await defaultRequest.post<IGetAllResponse>(`api/jwt/CodiumSystem/Operation/Edit`, {
//     kv: requestData,
//   });
// };

// const remove = async (id: string) => {
//   return await defaultRequest.post<IGetAllResponse>(`api/jwt/CodiumSystem/Operation/Delete`, { kv: { id } });
// };

export const commonOperationApi = {
  getAll,
  add,
  // edit,
  // remove,
};
