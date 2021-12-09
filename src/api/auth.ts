import { defaultRequest } from "helpers";

const checkUser = async () => {
  return await defaultRequest.post("user/check");
};

export const authApi = {
  checkUser,
};
