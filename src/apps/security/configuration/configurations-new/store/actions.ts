import { createAsyncThunk } from "@reduxjs/toolkit";
import { configurationApi, dictionaryApi } from "api";
import { IGetHtmlFormOrViewnameRequest } from "./types";

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

export const getHtmlFormOrViewname = createAsyncThunk(
  "configuration/getHtmlFormOrViewname",
  async (request: IGetHtmlFormOrViewnameRequest, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await configurationApi.getHtmlFormOrViewname(request);
      if (data?.err?.length === 0) {
        return data.tbl[0].r[0];
      } else {
        return rejectWithValue(data);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
