import { createAsyncThunk } from "@reduxjs/toolkit";
import { viewApi } from "api";
import { toast } from "react-toastify";
import { IAddOrEditViewRequest } from "./types";

export const getAll = createAsyncThunk("view/getAll", async (_, { rejectWithValue }) => {
  try {
    const { data } = await viewApi.getAll();
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
  "view/add",
  async (requestData: IAddOrEditViewRequest, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await viewApi.add(requestData);
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
  "view/edit",
  async (requestData: IAddOrEditViewRequest, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await viewApi.edit(requestData);
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

export const remove = createAsyncThunk("view/delete", async (viewName: string, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await viewApi.remove(viewName);
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

export const getScript = createAsyncThunk("view/getScript", async (viewName: string, { rejectWithValue }) => {
  try {
    const { data } = await viewApi.getScript(viewName);
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
