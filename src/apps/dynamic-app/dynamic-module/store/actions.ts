import { createAsyncThunk } from "@reduxjs/toolkit";
import { dynamicApi } from "api";
import { toast } from "react-toastify";

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

export const add = createAsyncThunk(
  "application/add",
  async (requestData: any, { rejectWithValue, getState, dispatch }) => {
    try {
      const state = getState();
      //@ts-ignore
      const url = state.module.module.operations.find((op) => op.code === "ADD")!.url;

      const { data } = await dynamicApi.add(url, requestData);
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

// export const remove = createAsyncThunk("application/remove", async (appId: string, { rejectWithValue, dispatch }) => {
//   try {
//     const { data } = await applicationApi.remove(appId);
//     if (data?.err.length === 0) {
//       await dispatch(getAll());
//       toast.success("Silindi");
//       return data;
//     } else {
//       //@ts-ignore
//       toast.error(data.message?.az);
//       return rejectWithValue(data);
//     }
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// });
