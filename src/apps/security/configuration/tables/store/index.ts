import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDialog, IObject } from "types";
import { add, addColumn, edit, editColumn, getAll, remove, removeColumn } from "./actions";
import { ILoading } from "./types";

export interface ITablesState {
  loading: ILoading;
  tables: IObject[];
  selectedTable: string;
  dialog: IDialog;
}

const initialState: ITablesState = {
  loading: {
    getAll: false,
    add: false,
    edit: false,
    remove: false,
    addColumn: false,
    editColumn: false,
    removeColumn: false,
  },
  selectedTable: "",
  dialog: {
    type: "",
    opened: false,
  },
  tables: [],
};

export const tablesSlice = createSlice({
  name: "tables",
  initialState: initialState,
  reducers: {
    setDialog: (state, action: PayloadAction<IDialog>) => {
      state.dialog = action.payload;
    },
    setSelectedTable: (state, action: PayloadAction<string>) => {
      state.selectedTable = action.payload;
    },
  },
  extraReducers: {
    //* GET ALL
    [getAll.pending.type]: (state) => {
      state.loading.getAll = true;
    },
    [getAll.rejected.type]: (state) => {
      state.loading.getAll = false;
      state.tables = [];
    },
    [getAll.fulfilled.type]: (state, action: PayloadAction<IObject[]>) => {
      state.loading.getAll = false;
      state.tables = action.payload;
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
      state.selectedTable = "";
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
      state.selectedTable = "";
    },
    //* REMOVE END
    //* ADD COLUMN
    [addColumn.pending.type]: (state) => {
      state.loading.addColumn = true;
    },
    [addColumn.rejected.type]: (state) => {
      state.loading.addColumn = false;
    },
    [addColumn.fulfilled.type]: (state) => {
      state.loading.addColumn = false;
    },
    //* ADD COLUMN END
    //* EDIT COLUMN
    [editColumn.pending.type]: (state) => {
      state.loading.editColumn = true;
    },
    [editColumn.rejected.type]: (state) => {
      state.loading.editColumn = false;
    },
    [editColumn.fulfilled.type]: (state) => {
      state.loading.editColumn = false;
    },
    //* EDIT COLUMN END
    //* REMOVE COLUMN
    [removeColumn.pending.type]: (state) => {
      state.loading.removeColumn = true;
    },
    [removeColumn.rejected.type]: (state) => {
      state.loading.removeColumn = false;
    },
    [removeColumn.fulfilled.type]: (state) => {
      state.loading.removeColumn = false;
    },
    //* REMOVE COLUMN END
  },
});

export const { setDialog, setSelectedTable } = tablesSlice.actions;
