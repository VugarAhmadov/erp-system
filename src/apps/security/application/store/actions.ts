import { createAsyncThunk } from "@reduxjs/toolkit";
import { applicationApi } from "api";
import { checkUser } from "apps/auth/store/actions";
import { toast } from "react-toastify";
import { IAddOrEditApplicationRequest } from "./types";

export const getAll = createAsyncThunk("application/getAll", async (_, { rejectWithValue }) => {
  try {
    const { data } = await applicationApi.getAll();
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
  "application/add",
  async (requestData: IAddOrEditApplicationRequest, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await applicationApi.add(requestData);
      if (data?.err.length === 0) {
        await dispatch(getAll());
        await dispatch(checkUser());
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
  "application/edit",
  async (requestData: IAddOrEditApplicationRequest, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await applicationApi.edit(requestData);
      if (data?.err?.length === 0) {
        await dispatch(getAll());
        await dispatch(checkUser());
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

export const remove = createAsyncThunk("application/remove", async (appId: string, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await applicationApi.remove(appId);
    if (data?.err.length === 0) {
      await dispatch(getAll());
      await dispatch(checkUser());
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
