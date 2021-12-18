import { createAsyncThunk } from "@reduxjs/toolkit";
import { configurationApi } from "api";
import { toast } from "react-toastify";
import { IAddViewRequest, IEditViewRequest } from "./types";

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

export const getTables = createAsyncThunk("configuration/getTables", async (_, { rejectWithValue }) => {
  try {
    const { data } = await configurationApi.getTables();
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

export const getViewScript = createAsyncThunk(
  "configuration/getViewScript",
  async (viewName: string, { rejectWithValue }) => {
    try {
      const { data } = await configurationApi.getViewScript(viewName);
      if (data) {
        return {
          viewName: viewName,
          viewScript: data.data?.slice(0, -1),
        };
      } else {
        return rejectWithValue(data);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const editView = createAsyncThunk(
  "configuration/editView",
  async (requestData: IEditViewRequest, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await configurationApi.editView(requestData);
      if (data.code === "OK") {
        await dispatch(getViews());
        toast.success("Düzəliş edildi");
        return data.data;
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

export const addView = createAsyncThunk(
  "configuration/addView",
  async (requestData: IAddViewRequest, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await configurationApi.addView(requestData);
      if (data.code === "OK") {
        await dispatch(getViews());
        toast.success("Əlavə edildi");
        return data.data;
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

export const deleteView = createAsyncThunk(
  "configuration/deleteView",
  async (viewName: string, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await configurationApi.deleteView(viewName);
      if (data.code === "OK") {
        await dispatch(getViews());
        toast.success("Silindi");
        return data.data;
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
