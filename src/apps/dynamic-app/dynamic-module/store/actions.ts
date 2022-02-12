import { createAsyncThunk } from "@reduxjs/toolkit";
import { dynamicApi } from "api";
import { toast } from "react-toastify";
import { IAddRequest, IGetRequest, IRemoveRequest, IEditRequest } from "./types";

export const getAll = createAsyncThunk("dynamic/getAll", async (_, { rejectWithValue, getState }) => {
  try {
    const state = getState();
    //@ts-ignore
    const url = state.common.selectedModule.operations.find((op) => op.code === "ALL_VIEW")!.url;
    const { data } = await dynamicApi.getAll(url);
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

export const get = createAsyncThunk("dynamic/get", async (requestData: IGetRequest, { rejectWithValue }) => {
  try {
    const { data } = await dynamicApi.get(requestData.url, requestData.id);
    if (data) {
      return data?.tbl[0].r[0];
    } else {
      return rejectWithValue(data);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const add = createAsyncThunk("dynamic/add", async (requestData: IAddRequest, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await dynamicApi.add(requestData.url, requestData.data);

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
});

// export const edit = createAsyncThunk(
//   "application/edit",
//   async (requestData: IAddOrEditApplicationRequest, { rejectWithValue, dispatch }) => {
//     try {
//       const { data } = await applicationApi.edit(requestData);
//       if (data?.err?.length === 0) {
//         await dispatch(getAll());
//         toast.success("Düzəliş edildi");
//         return data;
//       } else {
//         //@ts-ignore
//         toast.error(data.message?.az);
//         return rejectWithValue(data);
//       }
//     } catch (error) {
//       console.error(error);
//       throw error;
//     }
//   }
// );

export const edit = createAsyncThunk(
  "dynamic/edit",
  async (requestData: IEditRequest, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await dynamicApi.edit(requestData.url, requestData.data);

      if (data?.err.length === 0) {
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
  "dynamic/remove",
  async (requestData: IRemoveRequest, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await dynamicApi.remove(requestData.url, requestData.id);

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
