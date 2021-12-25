import { createAsyncThunk } from "@reduxjs/toolkit";
import { applicationApi } from "api";
import { toast } from "react-toastify";

export const getAll = createAsyncThunk("application/getAll", async (_, { rejectWithValue }) => {
  try {
    const { data } = await applicationApi.getAll();
    if (data) {
      return data?.tbl[0];
    } else {
      return rejectWithValue(data);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});
