import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IObject } from "types";
import { getAll } from "./actions";
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
  },
});
