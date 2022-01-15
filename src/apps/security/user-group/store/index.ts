import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAll } from "./actions";
import { IDialog, IGetAllTable } from "types";
import { ILoading } from "./types";

export interface IUserGroupState {
  loading: ILoading;
  userGroups: IGetAllTable;
  // dialog: IDialog;
  // selectedUser: string;
}

const initialState: IUserGroupState = {
  loading: {
    getAll: false,
    add: false,
    edit: false,
    remove: false,
  },
  userGroups: {} as IGetAllTable,
  // dialog: {
  //   opened: false,
  //   type: "",
  // },
  // selectedUser: "",
};

export const userGroupSlice = createSlice({
  name: "userGroup",
  initialState: initialState,
  reducers: {
    // setDialog: (state, action: PayloadAction<IDialog>) => {
    //   state.dialog = action.payload;
    // },
    // setSelectedUser: (state, action: PayloadAction<string>) => {
    //   state.selectedUser = action.payload;
    // },
  },
  extraReducers: {
    //* GET ALL
    [getAll.pending.type]: (state) => {
      state.loading.getAll = true;
    },
    [getAll.rejected.type]: (state, { payload }) => {
      state.loading.getAll = false;
      state.userGroups = {} as IGetAllTable;
    },
    [getAll.fulfilled.type]: (state, action: PayloadAction<IGetAllTable>) => {
      state.loading.getAll = false;
      state.userGroups = action.payload;
    },
    //* GET ALL END
    //* ADD
    // [add.pending.type]: (state) => {
    //   state.loading.add = true;
    // },
    // [add.rejected.type]: (state) => {
    //   state.loading.add = false;
    // },
    // [add.fulfilled.type]: (state) => {
    //   state.loading.add = false;
    //   state.dialog.opened = false;
    //   state.dialog.type = "";
    // },
    // //* ADD END
    // //* EDIT
    // [edit.pending.type]: (state) => {
    //   state.loading.edit = true;
    // },
    // [edit.rejected.type]: (state) => {
    //   state.loading.edit = false;
    // },
    // [edit.fulfilled.type]: (state) => {
    //   state.loading.edit = false;
    //   state.dialog.opened = false;
    //   state.dialog.type = "";
    // },
    // //* EDIT END
    // //* REMOVE
    // [remove.pending.type]: (state) => {
    //   state.loading.remove = true;
    // },
    // [remove.rejected.type]: (state) => {
    //   state.loading.remove = false;
    // },
    // [remove.fulfilled.type]: (state) => {
    //   state.loading.remove = false;
    // },
    //* REMOVE END
  },
});

// export const { setDialog, setSelectedUser } = userSlice.actions;
