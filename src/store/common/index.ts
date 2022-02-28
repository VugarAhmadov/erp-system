import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IModule } from "apps/auth/store/types";
import { getDictionaryTypeList } from "./actions";
import { IDictionyType } from "./types";

export interface ICommonState {
  selectedModule: IModule | null;
  dictionaryLoading: boolean;
  dictionaryTpyeList: IDictionyType[];
}

const initialState: ICommonState = {
  selectedModule: null,
  dictionaryLoading: false,
  dictionaryTpyeList: [],
};

export const commonSlice = createSlice({
  name: "common",
  initialState: initialState,
  reducers: {
    setSelectedModule: (state, action: PayloadAction<IModule | null>) => {
      state.selectedModule = action.payload;
    },
  },
  extraReducers: {
    //* GET_DICTIONARY_TYPE_LIST
    [getDictionaryTypeList.pending.type]: (state) => {
      state.dictionaryLoading = true;
    },
    [getDictionaryTypeList.rejected.type]: (state) => {
      state.dictionaryLoading = false;
      state.dictionaryTpyeList = [];
    },
    [getDictionaryTypeList.fulfilled.type]: (state, action: PayloadAction<IDictionyType[]>) => {
      state.dictionaryLoading = false;
      state.dictionaryTpyeList = action.payload;
    },
    //* GET_DICTIONARY_TYPE_LIST END
  },
});

export const { setSelectedModule } = commonSlice.actions;
