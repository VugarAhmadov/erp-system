import { createAsyncThunk } from "@reduxjs/toolkit";
import { configurationApi } from "api";

export const getViews = createAsyncThunk("configuration/getViews", async (_, { rejectWithValue }) => {
  try {
    const { data } = await configurationApi.getViews();
    if (data) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});
