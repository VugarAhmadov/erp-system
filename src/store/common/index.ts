import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IModule } from "apps/auth/store/types";

export interface ICommonState {
  selectedModule: IModule | null;
}

const initialState: ICommonState = {
  selectedModule: null,
};

export const commonSlice = createSlice({
  name: "common",
  initialState: initialState,
  reducers: {
    setSelectedModule: (state, action: PayloadAction<IModule | null>) => {
      state.selectedModule = action.payload;
    },
  },
});

export const { setSelectedModule } = commonSlice.actions;
