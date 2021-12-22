import { createAsyncThunk } from "@reduxjs/toolkit";
import { tablesApi } from "api";
import { toast } from "react-toastify";
import { IEditColumnRequest, IRemoveColumnRequest, IAddColumnRequest } from "./types";

export const getAll = createAsyncThunk("tables/getAll", async (_, { rejectWithValue }) => {
  try {
    const { data } = await tablesApi.getAll();
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

export const remove = createAsyncThunk("tables/remove", async (name: string, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await tablesApi.remove(name);
    if (data.code === "OK") {
      await dispatch(getAll());
      toast.success("Cedvel silindi");
      return data.data;
    } else {
      return rejectWithValue(data);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const addColumn = createAsyncThunk(
  "tables/addColumn",
  async (requestData: IAddColumnRequest, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await tablesApi.addColumn(requestData);
      if (data.code === "OK") {
        await dispatch(getAll());
        toast.success("Column elave edildi");
        return data.data;
      } else {
        return rejectWithValue(data);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const editColumn = createAsyncThunk(
  "tables/editColumn",
  async (requestData: IEditColumnRequest, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await tablesApi.editColumn(requestData);
      if (data.code === "OK") {
        await dispatch(getAll());
        toast.success("Column yenilendi");
        return data.data;
      } else {
        return rejectWithValue(data);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const removeColumn = createAsyncThunk(
  "tables/removeColumn",
  async (requestData: IRemoveColumnRequest, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await tablesApi.removeColumn(requestData);
      if (data.code === "OK") {
        await dispatch(getAll());
        toast.success("Column silindi");
        return data.data;
      } else {
        return rejectWithValue(data);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
