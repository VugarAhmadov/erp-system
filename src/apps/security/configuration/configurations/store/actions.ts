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

export const getConfigurationHtmlFormOrViewname = createAsyncThunk(
  "configuration/getConfigurationHtmlFormOrViewname",
  async (requestData: IAddTableRequest, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await tablesApi.add(requestData);

      if (data.code === "OK") {
        toast.success("Cedvel elave edildi");
        await dispatch(getAll());
        return data.data;
      } else {
        return rejectWithValue(data);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
