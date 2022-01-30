import { createAsyncThunk } from "@reduxjs/toolkit";
import { commonOperationApi } from "api";
import { checkUser } from "apps/auth/store/actions";
// import { setDialog } from "apps/security/configuration/configurations/store";
import { toast } from "react-toastify";
import { IAddOrEditCommonOperationRequest } from "./types";

export const getAll = createAsyncThunk("operation/getAll", async (_, { rejectWithValue }) => {
  try {
    const { data } = await commonOperationApi.getAll();
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
  "operation/add",
  async (requestData: IAddOrEditCommonOperationRequest, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await commonOperationApi.add(requestData);
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

// export const edit = createAsyncThunk(
//   "operation/edit",
//   async (requestData: IAddOrEditOperationRequest, { rejectWithValue, dispatch }) => {
//     try {
//       const { data } = await operationApi.edit(requestData);
//       if (data?.err?.length === 0) {
//         await dispatch(getAll());
//         await dispatch(checkUser());
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

// export const remove = createAsyncThunk(
//   "operation/remove",
//   async (operationId: string, { rejectWithValue, dispatch }) => {
//     try {
//       const { data } = await operationApi.remove(operationId);
//       if (data?.err.length === 0) {
//         await dispatch(getAll());
//         await dispatch(checkUser());
//         toast.success("Silindi");
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
