import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { add, edit, get, getAll, remove } from "./actions";
import { IDialog, IGetAllTable } from "types";
import { ILoading } from "./types";

export interface IDynamicState {
  loading: ILoading;
  datas: IGetAllTable<any>;
  dialog: IDialog;
  data: any;
}

const initialState: IDynamicState = {
  loading: {
    getAll: false,
    get: false,
    add: false,
    edit: false,
    remove: false,
  },
  datas: {} as IGetAllTable<any>,
  data: {},
  dialog: {
    opened: false,
    type: "",
  },
};

export const dynamicSlice = createSlice({
  name: "dynamic",
  initialState: initialState,
  reducers: {
    setDialog: (state, action: PayloadAction<IDialog>) => {
      state.dialog = action.payload;
      state.data = {};
    },
  },
  extraReducers: {
    //* GET ALL
    [getAll.pending.type]: (state) => {
      state.loading.getAll = true;
    },
    [getAll.rejected.type]: (state, { payload }) => {
      state.loading.getAll = false;
      state.datas = {} as IGetAllTable<any>;
    },
    [getAll.fulfilled.type]: (state, action: PayloadAction<IGetAllTable<any>>) => {
      state.loading.getAll = false;
      state.datas = action.payload;
    },
    //* GET ALL END
    //* GET
    [get.pending.type]: (state) => {
      state.loading.get = true;
    },
    [get.rejected.type]: (state, { payload }) => {
      state.loading.get = false;
      state.data = null;
    },
    [get.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.loading.get = false;
      state.data = action.payload;
      state.dialog.opened = true;
      state.dialog.type = "edit";
      state.dialog.selectedDataId = action.payload.id;
    },
    //* GET END
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
      state.dialog.selectedDataId = null;
    },
    // //* ADD END
    // //* EDIT
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
      state.dialog.selectedDataId = null;
    },
    // //* EDIT END
    //* REMOVE
    [remove.pending.type]: (state) => {
      state.loading.remove = true;
    },
    [remove.rejected.type]: (state) => {
      state.loading.remove = false;
    },
    [remove.fulfilled.type]: (state) => {
      state.loading.remove = false;
      state.dialog.opened = false;
      state.dialog.type = "";
      state.dialog.selectedDataId = null;
    },
    //* REMOVE END
  },
});

export const { setDialog } = dynamicSlice.actions;
