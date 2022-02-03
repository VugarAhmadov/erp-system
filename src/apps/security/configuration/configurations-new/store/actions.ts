import { createAsyncThunk } from "@reduxjs/toolkit";
import { configurationApi, dictionaryApi } from "api";
import { IGetHtmlFormOrViewnameRequest, IGetHtmlFormOrViewnameResponse, IOperationHtml } from "./types";

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
        const { id, code, operationHtml, url, viewName } = data.tbl[0].r[0];

        const _operationHtml = operationHtml && (JSON.parse(operationHtml) as IOperationHtml);

        const _data: IGetHtmlFormOrViewnameResponse = {
          id,
          code,
          url,
          viewName,
          formContent: _operationHtml ? _operationHtml.formContent : ({} as any),
          dialogSize: _operationHtml ? _operationHtml.dialogSize : "sm",
        };

        return _data;
      } else {
        return rejectWithValue(data);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
