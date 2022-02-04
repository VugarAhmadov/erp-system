import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAll, add, edit, remove } from "./actions";
import { IDialog, IGetAllTable } from "types";
import { ILoading } from "./types";

export interface IApplicationState {
  loading: ILoading;
  applications: IGetAllTable<any>;
  dialog: IDialog;
  selectedApp: string;
}

const initialState: IApplicationState = {
  loading: {
    getAll: false,
    add: false,
    edit: false,
    remove: false,
  },
  applications: {} as IGetAllTable<any>,
  dialog: {
    opened: false,
    type: "",
  },
  selectedApp: "",
};

export const applicationSlice = createSlice({
  name: "application",
  initialState: initialState,
  reducers: {
    setDialog: (state, action: PayloadAction<IDialog>) => {
      state.dialog = action.payload;
    },
    setSelectedApplication: (state, action: PayloadAction<string>) => {
      state.selectedApp = action.payload;
    },
  },
  extraReducers: {
    //* GET ALL
    [getAll.pending.type]: (state) => {
      state.loading.getAll = true;
    },
    [getAll.rejected.type]: (state, { payload }) => {
      state.loading.getAll = false;
      state.applications = {} as IGetAllTable<any>;
    },
    [getAll.fulfilled.type]: (state, action: PayloadAction<IGetAllTable<any>>) => {
      state.loading.getAll = false;
      state.applications = action.payload;
    },
    //* GET ALL END
    //* ADD
    [add.pending.type]: (state) => {
      state.loading.add = true;
    },
    [add.rejected.type]: (state) => {
      state.loading.add = false;
    },
    [add.fulfilled.type]: (state) => {
      state.loading.add = false;
      state.dialog.opened = false;
      state.dialog.type = "";
    },
    //* ADD END
    //* EDIT
    [edit.pending.type]: (state) => {
      state.loading.edit = true;
    },
    [edit.rejected.type]: (state) => {
      state.loading.edit = false;
    },
    [edit.fulfilled.type]: (state) => {
      state.loading.edit = false;
      state.dialog.opened = false;
      state.dialog.type = "";
    },
    //* EDIT END
    //* REMOVE
    [remove.pending.type]: (state) => {
      state.loading.remove = true;
    },
    [remove.rejected.type]: (state) => {
      state.loading.remove = false;
    },
    [remove.fulfilled.type]: (state) => {
      state.loading.remove = false;
    },
    //* REMOVE END
  },
});

export const { setDialog, setSelectedApplication } = applicationSlice.actions;
