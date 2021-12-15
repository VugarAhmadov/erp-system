import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTables, getViews } from "./actions";
import { ILoading, IView } from "./types";

export interface IConfigurationState {
  loading: ILoading;
  views: IView[];
  tables: IView[];
}

const initialState: IConfigurationState = {
  loading: {
    getViews: false,
    getTables: false,
  },
  views: [],
  tables: [],
};

export const configurationSlice = createSlice({
  name: "configuration",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getViews.pending.type]: (state) => {
      state.loading.getViews = true;
    },
    [getViews.rejected.type]: (state, { payload }) => {
      state.loading.getViews = false;
      state.views = [];
    },
    [getViews.fulfilled.type]: (state, action: PayloadAction<IView[]>) => {
      state.loading.getViews = false;
      state.views = action.payload;
    },
    [getTables.pending.type]: (state) => {
      state.loading.getTables = true;
    },
    [getTables.rejected.type]: (state, { payload }) => {
      state.loading.getTables = false;
      state.tables = [];
    },
    [getTables.fulfilled.type]: (state, action: PayloadAction<IView[]>) => {
      state.loading.getTables = false;
      state.tables = action.payload;
    },
  },
});
