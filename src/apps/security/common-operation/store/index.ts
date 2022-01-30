import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAll, add } from "./actions";
import { IDialog, IGetAllTable } from "types";
import { ILoading } from "./types";

export interface ICommonOperationState {
  loading: ILoading;
  commonOperations: IGetAllTable;
  dialog: IDialog;
  selectedOperation: string;
  htmlFormOrViewname: any;
}

const initialState: ICommonOperationState = {
  loading: {
    getAll: false,
    add: false,
    edit: false,
    remove: false,
  },
  commonOperations: {} as IGetAllTable,
  htmlFormOrViewname: {},
  dialog: {
    opened: false,
    type: "",
  },
  selectedOperation: "",
};

export const commonOperationSlice = createSlice({
  name: "commonOperation",
  initialState: initialState,
  reducers: {
    setDialog: (state, action: PayloadAction<IDialog>) => {
      state.dialog = action.payload;
    },
    setSelectedOperation: (state, action: PayloadAction<string>) => {
      state.selectedOperation = action.payload;
    },
  },
  extraReducers: {
    //* GET ALL
    [getAll.pending.type]: (state) => {
      state.loading.getAll = true;
    },
    [getAll.rejected.type]: (state, { payload }) => {
      state.loading.getAll = false;
      state.commonOperations = {} as IGetAllTable;
    },
    [getAll.fulfilled.type]: (state, action: PayloadAction<IGetAllTable>) => {
      state.loading.getAll = false;
      state.commonOperations = action.payload;
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
    // [edit.pending.type]: (state) => {
    //   state.loading.edit = true;
    // },
    // [edit.rejected.type]: (state) => {
    //   state.loading.edit = false;
    // },
    // [edit.fulfilled.type]: (state) => {
    //   state.loading.edit = false;
    //   state.dialog.opened = false;
    //   state.dialog.type = "";
    // },
    //* EDIT END
    //* REMOVE
    // [remove.pending.type]: (state) => {
    //   state.loading.remove = true;
    // },
    // [remove.rejected.type]: (state) => {
    //   state.loading.remove = false;
    // },
    // [remove.fulfilled.type]: (state) => {
    //   state.loading.remove = false;
    // },
    //* REMOVE END
  },
});

export const { setDialog, setSelectedOperation } = commonOperationSlice.actions;
