import { createAsyncThunk } from "@reduxjs/toolkit";
import { tablesApi } from "api";

export const getAll = createAsyncThunk("tables/getAll", async (_, { rejectWithValue }) => {
  try {
    const { data } = await tablesApi.getAll();
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
