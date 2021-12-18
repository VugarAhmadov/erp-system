import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addView, editView, getTables, getViews, getViewScript } from "./actions";
import { ILoading, IView, ISelectedView } from "./types";

export interface IConfigurationState {
  loading: ILoading;
  views: IView[];
  tables: IView[];
  selectedView: ISelectedView;
  viewDialogOpened: boolean;
}

const initialState: IConfigurationState = {
  loading: {
    getViews: false,
    getTables: false,
    getViewScript: false,
    editView: false,
    addView: false,
    deleteView: false,
  },
  views: [],
  tables: [],
  selectedView: {
    viewName: "",
    viewScript: "",
  },
  viewDialogOpened: false,
};

export const configurationSlice = createSlice({
  name: "configuration",
  initialState: initialState,
  reducers: {
    setViewDialogOpened: (state, action: PayloadAction<boolean>) => {
      state.viewDialogOpened = action.payload;
    },
    clearSelectedView: (state) => {
      state.selectedView = {} as ISelectedView;
      state.viewDialogOpened = false;
    },
  },
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
    [getViewScript.pending.type]: (state) => {
      state.loading.getViewScript = true;
    },
    [getViewScript.rejected.type]: (state, { payload }) => {
      state.loading.getViewScript = false;
      state.selectedView.viewScript = "";
      state.viewDialogOpened = false;
    },
    [getViewScript.fulfilled.type]: (state, action: PayloadAction<ISelectedView>) => {
      state.loading.getViewScript = false;
      state.selectedView = action.payload;
      state.viewDialogOpened = true;
    },
    [editView.pending.type]: (state) => {
      state.loading.editView = true;
    },
    [editView.rejected.type]: (state) => {
      state.loading.editView = false;
    },
    [editView.fulfilled.type]: (state, action: PayloadAction<ISelectedView>) => {
      state.loading.editView = false;
      state.viewDialogOpened = false;
    },
    [addView.pending.type]: (state) => {
      state.loading.addView = true;
    },
    [addView.rejected.type]: (state) => {
      state.loading.addView = false;
    },
    [addView.fulfilled.type]: (state, action: PayloadAction<ISelectedView>) => {
      state.loading.addView = false;
      state.viewDialogOpened = false;
    },
  },
});

export const { setViewDialogOpened, clearSelectedView } = configurationSlice.actions;
