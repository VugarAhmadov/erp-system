import { createAsyncThunk } from "@reduxjs/toolkit";
import { dictionaryApi } from "api";

export const getDictionaryTypeList = createAsyncThunk(
  "dictionary/getDictionaryTypeList",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await dictionaryApi.getDictionaryTypeList();
      if (data?.err?.length === 0) {
        return data.tbl[0].r;
      } else {
        return rejectWithValue(data);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
