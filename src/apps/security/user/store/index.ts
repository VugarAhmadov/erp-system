import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAll, add, edit, remove } from "./actions";
import { IDialog, IGetAllTable } from "types";
import { ILoading } from "./types";

export interface IUserState {
  loading: ILoading;
  users: IGetAllTable;
  dialog: IDialog;
  selectedUser: string;
}

const initialState: IUserState = {
  loading: {
    getAll: false,
    add: false,
    edit: false,
    remove: false,
    getHtmlFormOrViewname: false,
    addHtmlForm: false,
  },
  users: {} as IGetAllTable,
  dialog: {
    opened: false,
    type: "",
  },
  selectedUser: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setDialog: (state, action: PayloadAction<IDialog>) => {
      state.dialog = action.payload;
    },
    setSelectedUser: (state, action: PayloadAction<string>) => {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: {
    //* GET ALL
    [getAll.pending.type]: (state) => {
      state.loading.getAll = true;
    },
    [getAll.rejected.type]: (state, { payload }) => {
      state.loading.getAll = false;
      state.users = {} as IGetAllTable;
    },
    [getAll.fulfilled.type]: (state, action: PayloadAction<IGetAllTable>) => {
      state.loading.getAll = false;
      state.users = action.payload;
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
  },
});

export const { setDialog, setSelectedUser } = userSlice.actions;
