import { AxiosResponse } from "axios";
import { defaultRequest } from "helpers";
import { IUser } from "store/slices/auth/types";
import { IDispatcherResponse } from "types";

const checkUser = async () => {
  return await defaultRequest.post<IDispatcherResponse<IUser>>("user/check");
};

export const authApi = {
  checkUser,
};
