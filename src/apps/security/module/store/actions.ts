import { createAsyncThunk } from "@reduxjs/toolkit";
import { moduleApi } from "api";
import { toast } from "react-toastify";
import { IAddOrEditModuleRequest } from "./types";

export const getAll = createAsyncThunk("module/getAll", async (_, { rejectWithValue }) => {
  try {
    const { data } = await moduleApi.getAll();
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
  "module/add",
  async (requestData: IAddOrEditModuleRequest, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await moduleApi.add(requestData);
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
  "module/edit",
  async (requestData: IAddOrEditModuleRequest, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await moduleApi.edit(requestData);
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

export const remove = createAsyncThunk("module/remove", async (moduleId: string, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await moduleApi.remove(moduleId);
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
});
