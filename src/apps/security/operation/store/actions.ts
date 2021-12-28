import { createAsyncThunk } from "@reduxjs/toolkit";
import { operationApi } from "api";
import { toast } from "react-toastify";
import { IAddOrEditOperationRequest, IGetHtmlFormOrViewnameRequest } from "./types";

export const getAll = createAsyncThunk("operation/getAll", async (_, { rejectWithValue }) => {
  try {
    const { data } = await operationApi.getAll();
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

export const add = createAsyncThunk(
  "operation/add",
  async (requestData: IAddOrEditOperationRequest, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await operationApi.add(requestData);
      if (data?.err.length === 0) {
        await dispatch(getAll());
        toast.success("Əlavə edildi");
        return data;
      } else {
        //@ts-ignore
        toast.error(data.message?.az);
        return rejectWithValue(data);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const edit = createAsyncThunk(
  "operation/edit",
  async (requestData: IAddOrEditOperationRequest, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await operationApi.edit(requestData);
      if (data?.err?.length === 0) {
        await dispatch(getAll());
        toast.success("Düzəliş edildi");
        return data;
      } else {
        //@ts-ignore
        toast.error(data.message?.az);
        return rejectWithValue(data);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const remove = createAsyncThunk(
  "operation/remove",
  async (operationId: string, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await operationApi.remove(operationId);
      if (data?.err.length === 0) {
        await dispatch(getAll());
        toast.success("Silindi");
        return data;
      } else {
        //@ts-ignore
        toast.error(data.message?.az);
        return rejectWithValue(data);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const getHtmlFormOrViewname = createAsyncThunk(
  "operation/getHtmlFormOrViewname",
  async (request: IGetHtmlFormOrViewnameRequest, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await operationApi.getHtmlFormOrViewname(request);
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
