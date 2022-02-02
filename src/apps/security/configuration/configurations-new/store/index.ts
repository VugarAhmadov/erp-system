import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOperation } from "apps/auth/store/types";
import { IDialog } from "types";
import { getDictionaryTypeList } from "./actions";
import { IDictionyType, ILoading } from "./types";

export interface IConfigurationsState {
  loading: ILoading;
  dialog: IDialog;
  selectedOperation: IOperation;
  dictionaryTpyeList: IDictionyType[];
}

const initialState: IConfigurationsState = {
  loading: {
    getDictionaryTypeList: false,
  },
  selectedOperation: {} as IOperation,
  dictionaryTpyeList: [],
  dialog: {
    type: "",
    opened: false,
  },
};

export const configurationsSlice = createSlice({
  name: "configurations",
  initialState: initialState,
  reducers: {
    setDialog: (state, action: PayloadAction<IDialog>) => {
      state.dialog = action.payload;
    },
    setSelectedOperation: (state, action: PayloadAction<IOperation>) => {
      state.selectedOperation = action.payload;
    },
  },
  extraReducers: {
    //* GET_DICTIONARY_TYPE_LIST
    [getDictionaryTypeList.pending.type]: (state) => {
      state.loading.getDictionaryTypeList = true;
    },
    [getDictionaryTypeList.rejected.type]: (state) => {
      state.loading.getDictionaryTypeList = false;
      state.dictionaryTpyeList = [];
    },
    [getDictionaryTypeList.fulfilled.type]: (state, action: PayloadAction<IDictionyType[]>) => {
      state.loading.getDictionaryTypeList = false;
      state.dictionaryTpyeList = action.payload;
    },
    //* GET_DICTIONARY_TYPE_LIST END
  },
});

export const { setDialog, setSelectedOperation } = configurationsSlice.actions;
