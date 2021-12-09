import { createSlice } from "@reduxjs/toolkit";
import { checkUser } from "./actions";
import { ILoading, IUser } from "./types";

export interface IAuthState {
  loading: ILoading;
  isLoggedIn: boolean;
  user: IUser;
}

const initialState: IAuthState = {
  loading: {
    checkUser: false,
  },
  isLoggedIn: false,
  user: {} as IUser,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [checkUser.pending.type]: (state) => {
      state.loading.checkUser = true;
    },
    [checkUser.rejected.type]: (state, { payload }) => {
      state.loading.checkUser = false;
      state.isLoggedIn = false;
      state.user = {} as IUser;
      // state.errorMessage = payload;
    },
    [checkUser.fulfilled.type]: (state, { payload }) => {
      state.loading.checkUser = false;
      state.isLoggedIn = true;
      state.user = payload.data;
      // state.errorMessage = {} as IErrorMessage;
    },
  },
});
