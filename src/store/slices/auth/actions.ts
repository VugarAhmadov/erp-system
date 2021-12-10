import { createAsyncThunk } from "@reduxjs/toolkit";
import { push } from "redux-first-history";
import { authApi } from "api/auth";

export const checkUser = createAsyncThunk("auth/checkUser", async (_, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await authApi.checkUser();
    if (data.code === "OK") {
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
