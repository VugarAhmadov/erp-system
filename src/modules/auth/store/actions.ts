import { createAsyncThunk } from "@reduxjs/toolkit";
import { push } from "redux-first-history";
import { authApi } from "api";
import { ILoginData, IUser } from "./types";
import { getUrl } from "./utils";

export const checkUser = createAsyncThunk("auth/checkUser", async (_, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await authApi.checkUser();
    if (data.code === "OK") {
      const url = getUrl(data.data as IUser);
      dispatch(push(url));

      return data.data;
    } else {
      return rejectWithValue(data.code);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const login = createAsyncThunk("auth/login", async (loginData: ILoginData, { rejectWithValue, dispatch }) => {
  try {
    const { data, headers } = await authApi.login(loginData);
    if (data.code === "OK") {
      localStorage.setItem("codeum_jwt_token", headers.auth);

      const url = getUrl(data.data as IUser);
      dispatch(push(url));

      return data.data;
    } else {
      return rejectWithValue(data.code);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});
