import { defaultRequest } from "helpers";
import { IGetAllResponse } from "types";
import { IAddOrEditUserRequest } from "apps/security/user/store/types";

const getAll = async () => {
  return await defaultRequest.post<IGetAllResponse<any>>("api/jwt/CodiumSystem/UserGroup/AllView");
};

// const add = async (requestData: IAddOrEditUserRequest) => {
//   return await defaultRequest.post<IGetAllResponse<any>>(`api/jwt/CodiumSystem/Users/Add`, {
//     kv: requestData,
//   });
// };

// const edit = async (requestData: IAddOrEditUserRequest) => {
//   return await defaultRequest.post<IGetAllResponse<any>>(`api/jwt/CodiumSystem/Users/Edit`, {
//     kv: requestData,
//   });
// };

// const remove = async (id: string) => {
//   return await defaultRequest.post<IGetAllResponse<any>>(`api/jwt/CodiumSystem/Users/Delete`, { kv: { id } });
// };

export const userGroupApi = {
  getAll,
  // add,
  // edit,
  // remove,
};
