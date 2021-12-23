import { createAsyncThunk } from "@reduxjs/toolkit";
import { tablesApi } from "api";
import { toast } from "react-toastify";
import {
  IEditColumnRequest,
  IRemoveColumnRequest,
  IAddColumnRequest,
  IEditTableRequest,
  IAddTableRequest,
} from "./types";

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

export const add = createAsyncThunk(
  "tables/add",
  async (requestData: IAddTableRequest, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await tablesApi.add(requestData);

      if (data.code === "OK") {
        toast.success("Cedvel elave edildi");
        await dispatch(getAll());
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

export const edit = createAsyncThunk(
  "tables/edit",
  async (requestData: IEditTableRequest, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await tablesApi.edit(requestData);

      if (data.code === "OK") {
        toast.success("Cedvel yenilendi");
        await dispatch(getAll());
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

export const remove = createAsyncThunk("tables/remove", async (name: string, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await tablesApi.remove(name);

    if (data.code === "OK") {
      toast.success("Cedvel silindi");
      await dispatch(getAll());
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
        toast.success("Column elave edildi");
        await dispatch(getAll());
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
        toast.success("Column yenilendi");
        await dispatch(getAll());
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
        toast.success("Column silindi");
        await dispatch(getAll());
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
