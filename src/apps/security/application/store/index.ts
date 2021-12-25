import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAll } from "./actions";
import { IDialog, IGetAllTable } from "types";
import { ILoading } from "./types";

export interface IApplicationState {
  loading: ILoading;
  applications: IGetAllTable;
  dialog: IDialog;
}

const initialState: IApplicationState = {
  loading: {
    getAll: false,
    add: false,
    edit: false,
    remove: false,
  },
  applications: {} as IGetAllTable,
  dialog: {
    opened: false,
    type: "",
  },
};

export const applicationSlice = createSlice({
  name: "application",
  initialState: initialState,
  reducers: {
    setDialog: (state, action: PayloadAction<IDialog>) => {
      state.dialog = action.payload;
    },
  },
  extraReducers: {
    //* GET ALL
    [getAll.pending.type]: (state) => {
      state.loading.getAll = true;
    },
    [getAll.rejected.type]: (state, { payload }) => {
      state.loading.getAll = false;
      state.applications = {} as IGetAllTable;
    },
    [getAll.fulfilled.type]: (state, action: PayloadAction<IGetAllTable>) => {
      state.loading.getAll = false;
      state.applications = action.payload;
    },
    //* GET ALL END
  },
});

export const { setDialog } = applicationSlice.actions;
