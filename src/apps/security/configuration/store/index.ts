import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getViews } from "./actions";
import { ILoading, IView } from "./types";

export interface IConfigurationState {
  loading: ILoading;
  views: IView[];
}

const initialState: IConfigurationState = {
  loading: {
    getViews: false,
  },
  views: [],
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
  },
});
