import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
      state.loading.checkUser = true;
      state.isLoggedIn = false;
      state.user = {} as IUser;
      // state.errorMessage = payload;
    },
    [checkUser.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.loading.checkUser = true;
      state.isLoggedIn = true;
      state.user = action.payload;
      // state.errorMessage = {} as IErrorMessage;
    },
  },
});
