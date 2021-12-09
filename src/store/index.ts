import { configureStore, Action, ThunkAction } from "@reduxjs/toolkit";
import { createBrowserHistory } from "history";
import { createReduxHistoryContext } from "redux-first-history";
import { authSlice, configurationSlice } from "./slices";

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
  history: createBrowserHistory(),
});

const store = configureStore({
  reducer: {
    router: routerReducer,
    [configurationSlice.name]: configurationSlice.reducer,
    [authSlice.name]: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware),
});

export const history = createReduxHistory(store);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, AppState, unknown, Action>;

export default store;
