import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAll, add, edit, remove, getScript } from "./actions";
import { ILoading, IView, ISelectedView } from "./types";

export interface IViewState {
  loading: ILoading;
  views: IView[];
  selectedView: ISelectedView;
  dialogOpened: boolean;
}

const initialState: IViewState = {
  loading: {
    getScript: false,
    getAll: false,
    edit: false,
    add: false,
    delete: false,
  },
  views: [],
  selectedView: {} as ISelectedView,
  dialogOpened: false,
};

export const viewSlice = createSlice({
  name: "view",
  initialState: initialState,
  reducers: {
    setDialogOpened: (state, action: PayloadAction<boolean>) => {
      state.dialogOpened = action.payload;
    },
    setSelectedView: (state, action: PayloadAction<ISelectedView>) => {
      state.selectedView = action.payload;
    },
  },
  extraReducers: {
    [getAll.pending.type]: (state) => {
      state.loading.getAll = true;
    },
    [getAll.rejected.type]: (state, { payload }) => {
      state.loading.getAll = false;
      state.views = [];
    },
    [getAll.fulfilled.type]: (state, action: PayloadAction<IView[]>) => {
      state.loading.getAll = false;
      state.views = action.payload;
    },
    [getTables.pending.type]: (state) => {
      state.loading.getTables = true;
    },
    [getTables.rejected.type]: (state) => {
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
    [getViewScript.rejected.type]: (state) => {
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
    [editView.fulfilled.type]: (state) => {
      state.loading.editView = false;
      state.viewDialogOpened = false;
    },
    [addView.pending.type]: (state) => {
      state.loading.addView = true;
    },
    [addView.rejected.type]: (state) => {
      state.loading.addView = false;
    },
    [addView.fulfilled.type]: (state) => {
      state.loading.addView = false;
      state.viewDialogOpened = false;
    },
  },
});

export const { setViewDialogOpened, setSelectedView } = configurationSlice.actions;
