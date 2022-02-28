import { createAsyncThunk } from "@reduxjs/toolkit";
import { configurationApi, dictionaryApi } from "api";
import { snakeCase } from "lodash";
import { IGetViewFormResponse, IGetHtmlFormOrViewnameRequest, IGetHtmlFormResponse, IOperationHtml } from "./types";

export const getHtmlForm = createAsyncThunk(
  "configuration/getHtmlForm",
  async (request: IGetHtmlFormOrViewnameRequest, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await configurationApi.getHtmlFormOrViewname(request);
      if (data?.err?.length === 0) {
        const { id, code, operationHtml, url, viewName } = data.tbl[0].r[0];

        const _operationHtml = operationHtml && (JSON.parse(operationHtml) as IOperationHtml);

        const _data: IGetHtmlFormResponse = {
          id,
          code,
          url,
          viewName,
          formContent: _operationHtml && _operationHtml.formContent ? _operationHtml.formContent : [],
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

export const getViewForm = createAsyncThunk(
  "configuration/getViewForm",
  async (request: IGetHtmlFormOrViewnameRequest, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await configurationApi.getHtmlFormOrViewname(request);
      if (data?.err?.length === 0) {
        const { id, code, url, viewName, seqColumns } = data.tbl[0].r[0];

        const _data: IGetViewFormResponse = {
          id,
          code,
          url,
          viewName,
          seqColumn: seqColumns?.split(",")?.map((column: string) => snakeCase(column)),
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
