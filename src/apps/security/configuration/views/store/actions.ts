import { createAsyncThunk } from "@reduxjs/toolkit";
import { viewsApi } from "api";
import { toast } from "react-toastify";
import { IAddOrEditViewRequest } from "./types";

export const getAll = createAsyncThunk("views/getAll", async (_, { rejectWithValue }) => {
  try {
    const { data } = await viewsApi.getAll();
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

export const add = createAsyncThunk(
  "views/add",
  async (requestData: IAddOrEditViewRequest, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await viewsApi.add(requestData);
      if (data.code === "OK") {
        await dispatch(getAll());
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

export const edit = createAsyncThunk(
  "views/edit",
  async (requestData: IAddOrEditViewRequest, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await viewsApi.edit(requestData);
      if (data.code === "OK") {
        await dispatch(getAll());
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

export const remove = createAsyncThunk("views/remove", async (viewName: string, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await viewsApi.remove(viewName);
    if (data.code === "OK") {
      await dispatch(getAll());
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
});

export const getScript = createAsyncThunk("views/getScript", async (viewName: string, { rejectWithValue }) => {
  try {
    const { data } = await viewsApi.getScript(viewName);
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
});
