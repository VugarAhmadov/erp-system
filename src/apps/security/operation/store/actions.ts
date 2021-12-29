import { createAsyncThunk } from "@reduxjs/toolkit";
import { operationApi } from "api";
import { setDialog } from "apps/security/configuration/configurations/store";
import { toast } from "react-toastify";
import {
  IAddOrEditOperationRequest,
  IGetHtmlFormOrViewnameRequest,
  IAddHtmlFormRequest,
  IAddViewFormRequest,
} from "./types";

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

export const addHtmlForm = createAsyncThunk(
  "operation/addHtmlForm",
  async (request: IAddHtmlFormRequest, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await operationApi.addHtmlForm(request);
      if (data?.err?.length === 0) {
        dispatch(setDialog({ opened: false, type: "" }));
        return data;
      } else {
        return rejectWithValue(data);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
export const addViewForm = createAsyncThunk(
  "operation/addViewForm",
  async (request: IAddViewFormRequest, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await operationApi.addViewForm(request);
      if (data?.err?.length === 0) {
        dispatch(setDialog({ opened: false, type: "" }));
        return data;
      } else {
        return rejectWithValue(data);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
