import { createAsyncThunk } from "@reduxjs/toolkit";
import { push } from "redux-first-history";
import { authApi } from "api/auth";
import { ResponseStatus } from "types";

export const checkUser = createAsyncThunk("auth/checkUser", async (_, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await authApi.checkUser();
    if (data.code === ResponseStatus.OK) {
      dispatch(push("/configuration"));
      return data.data;
    } else {
      return rejectWithValue(data.code);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});
