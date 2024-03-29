import { defaultRequest } from "helpers";
import { ILoginData, IUser } from "apps/auth/store/types";
import { IDispatcherResponse } from "types";

const checkUser = async () => {
  return await defaultRequest.post<IDispatcherResponse<IUser>>("api/jwt/user/check");
};

const login = async (loginData: ILoginData) => {
  return await defaultRequest.post<IDispatcherResponse<IUser>>("login", loginData);
};

const logout = async () => {
  return await defaultRequest.post("system/exit");
};

export const authApi = {
  login,
  checkUser,
  logout,
};
