import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAll, add, edit, remove, addHtmlForm } from "./actions";
import { IDialog, IGetAllTable } from "types";
import { ILoading } from "./types";

export interface IOperationState {
  loading: ILoading;
  operations: IGetAllTable<any>;
  dialog: IDialog;
  selectedOperation: string;
}

const initialState: IOperationState = {
  loading: {
    getAll: false,
    add: false,
    edit: false,
    remove: false,
    getHtmlFormOrViewname: false,
    addHtmlForm: false,
  },
  operations: {} as IGetAllTable<any>,
  dialog: {
    opened: false,
    type: "",
  },
  selectedOperation: "",
};

export const operationSlice = createSlice({
  name: "operation",
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
      state.operations = {} as IGetAllTable<any>;
    },
    [getAll.fulfilled.type]: (state, action: PayloadAction<IGetAllTable<any>>) => {
      state.loading.getAll = false;
      state.operations = action.payload;
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
    //* ADD_HTML_FORM
    [addHtmlForm.pending.type]: (state) => {
      state.loading.addHtmlForm = true;
    },
    [addHtmlForm.rejected.type]: (state) => {
      state.loading.addHtmlForm = false;
    },
    [addHtmlForm.fulfilled.type]: (state) => {
      state.loading.addHtmlForm = false;
    },
    //* ADD_HTML_FORM END
  },
});

export const { setDialog, setSelectedOperation } = operationSlice.actions;
