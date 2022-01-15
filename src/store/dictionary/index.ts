import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getGenders } from "./actions";
import { ILoading } from "./types";

export interface IDictionaryState {
  loading: ILoading;
  genders: any[];
}

const initialState: IDictionaryState = {
  loading: {
    getGenders: false,
  },
  genders: [],
};

export const dictionarySlice = createSlice({
  name: "dictionary",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    //* GET GENDERS
    [getGenders.pending.type]: (state) => {
      state.loading.getGenders = true;
    },
    [getGenders.rejected.type]: (state, { payload }) => {
      state.loading.getGenders = false;
      state.genders = [];
    },
    [getGenders.fulfilled.type]: (state, action: PayloadAction<any[]>) => {
      state.loading.getGenders = false;
      state.genders = action.payload;
    },
    //* GET GENDERS END
  },
});
