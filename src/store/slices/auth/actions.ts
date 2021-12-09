import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "api/auth";
import { push } from "redux-first-history";

export const checkUser = createAsyncThunk("auth/checkUser", async (_, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await authApi.checkUser();
    if (data.code === "OK") {
      dispatch(push("/configuration"));
      console.log("test");
      return data;
    } else {
      return rejectWithValue(data.code);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});
