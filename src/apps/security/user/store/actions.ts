import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApi } from "api";
import { checkUser } from "apps/auth/store/actions";
import { toast } from "react-toastify";
import { IAddOrEditUserRequest } from "./types";

export const getAll = createAsyncThunk("user/getAll", async (_, { rejectWithValue }) => {
  try {
    const { data } = await userApi.getAll();
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
  "user/add",
  async (requestData: IAddOrEditUserRequest, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await userApi.add(requestData);
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
  "user/edit",
  async (requestData: IAddOrEditUserRequest, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await userApi.edit(requestData);
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

export const remove = createAsyncThunk("user/remove", async (userId: string, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await userApi.remove(userId);
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
