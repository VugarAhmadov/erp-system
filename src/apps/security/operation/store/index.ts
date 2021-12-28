import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAll, add, edit, remove, getHtmlFormOrViewname } from "./actions";
import { IDialog, IGetAllTable } from "types";
import { ILoading } from "./types";

export interface IOperationState {
  loading: ILoading;
  operations: IGetAllTable;
  dialog: IDialog;
  selectedOperation: string;
  htmlFormOrViewname: any;
}

const initialState: IOperationState = {
  loading: {
    getAll: false,
    add: false,
    edit: false,
    remove: false,
    getHtmlFormOrViewname: false,
  },
  operations: {} as IGetAllTable,
  htmlFormOrViewname: {},
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
      state.operations = {} as IGetAllTable;
    },
    [getAll.fulfilled.type]: (state, action: PayloadAction<IGetAllTable>) => {
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
    //* GET_HTML_FORM_OR_VIEWNAME
    [getHtmlFormOrViewname.pending.type]: (state) => {
      state.loading.getHtmlFormOrViewname = true;
    },
    [getHtmlFormOrViewname.rejected.type]: (state) => {
      state.loading.getHtmlFormOrViewname = false;
    },
    [getHtmlFormOrViewname.fulfilled.type]: (state, action: PayloadAction) => {
      state.loading.getHtmlFormOrViewname = false;
      state.htmlFormOrViewname = action.payload;
    },
    //* GET_HTML_FORM_OR_VIEWNAME END
  },
});

export const { setDialog, setSelectedOperation } = operationSlice.actions;
