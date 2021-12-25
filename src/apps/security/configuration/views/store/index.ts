import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAll, add, edit, remove, getScript } from "./actions";
import { IObject } from "types";
import { ILoading, ISelectedView } from "./types";

export interface IViewsState {
  loading: ILoading;
  views: IObject[];
  selectedView: ISelectedView;
  dialogOpened: boolean;
}

const initialState: IViewsState = {
  loading: {
    getAll: false,
    add: false,
    edit: false,
    remove: false,
    getScript: false,
  },
  views: [],
  selectedView: {} as ISelectedView,
  dialogOpened: false,
};

export const viewsSlice = createSlice({
  name: "views",
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
    //* GET ALL
    [getAll.pending.type]: (state) => {
      state.loading.getAll = true;
    },
    [getAll.rejected.type]: (state, { payload }) => {
      state.loading.getAll = false;
      state.views = [];
    },
    [getAll.fulfilled.type]: (state, action: PayloadAction<IObject[]>) => {
      state.loading.getAll = false;
      state.views = action.payload;
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
      state.dialogOpened = false;
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
      state.dialogOpened = false;
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
      state.dialogOpened = false;
    },
    //* REMOVE END
    //* GET SCRIPT
    [getScript.pending.type]: (state) => {
      state.loading.getScript = true;
    },
    [getScript.rejected.type]: (state) => {
      state.loading.getScript = false;
      state.selectedView.viewScript = "";
      state.dialogOpened = false;
    },
    [getScript.fulfilled.type]: (state, action: PayloadAction<ISelectedView>) => {
      state.loading.getScript = false;
      state.selectedView = action.payload;
      state.dialogOpened = true;
    },
    //* GET SCRIPT END
  },
});

export const { setDialogOpened, setSelectedView } = viewsSlice.actions;
