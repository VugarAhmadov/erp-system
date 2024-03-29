import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAll, add, edit, remove } from "./actions";
import { IDialog, IGetAllTable } from "types";
import { ILoading } from "./types";
import { IModule } from "apps/auth/store/types";

export interface IModuleState {
  loading: ILoading;
  modules: IGetAllTable<any>;
  dialog: IDialog;
  selectedModule: string;
  module: IModule;
}

const initialState: IModuleState = {
  loading: {
    getAll: false,
    add: false,
    edit: false,
    remove: false,
  },
  modules: {} as IGetAllTable<any>,
  module: {} as IModule,
  dialog: {
    opened: false,
    type: "",
  },
  selectedModule: "",
};

export const moduleSlice = createSlice({
  name: "module",
  initialState: initialState,
  reducers: {
    setDialog: (state, action: PayloadAction<IDialog>) => {
      state.dialog = action.payload;
    },
    setSelectedModule: (state, action: PayloadAction<string>) => {
      state.selectedModule = action.payload;
    },
    setModule: (state, action: PayloadAction<IModule>) => {
      state.module = action.payload;
    },
  },
  extraReducers: {
    //* GET ALL
    [getAll.pending.type]: (state) => {
      state.loading.getAll = true;
    },
    [getAll.rejected.type]: (state, { payload }) => {
      state.loading.getAll = false;
      state.modules = {} as IGetAllTable<any>;
    },
    [getAll.fulfilled.type]: (state, action: PayloadAction<IGetAllTable<any>>) => {
      state.loading.getAll = false;
      state.modules = action.payload;
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

export const { setDialog, setSelectedModule, setModule } = moduleSlice.actions;
