import { createSlice } from "@reduxjs/toolkit";

export interface IConfigurationState {
  theme: string;
}

const initialState: IConfigurationState = {
  theme: "light",
};

export const configurationSlice = createSlice({
  name: "configuration",
  initialState: initialState,
  reducers: {
    setTheme: (state, action) => ({
      ...state,
      theme: action.payload,
    }),
  },
});
