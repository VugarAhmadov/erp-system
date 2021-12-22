import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IObject } from "types";
import { addColumn, editColumn, getAll, removeColumn } from "./actions";
import { ILoading } from "./types";

export interface ITablesState {
  loading: ILoading;
  tables: IObject[];
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
  tables: [],
};

export const tablesSlice = createSlice({
  name: "tables",
  initialState: initialState,
  reducers: {},
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
