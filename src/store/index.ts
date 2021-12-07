import { configureStore, Action, ThunkAction } from "@reduxjs/toolkit";

import { configurationSlice } from "./slices";

const store = configureStore({
  reducer: {
    [configurationSlice.name]: configurationSlice.reducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, AppState, unknown, Action>;

export default store;
