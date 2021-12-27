import { configureStore, Action, ThunkAction } from "@reduxjs/toolkit";
import { createBrowserHistory } from "history";
import { createReduxHistoryContext } from "redux-first-history";
import { authSlice } from "apps/auth/store";
import { tablesSlice } from "apps/security/configuration/tables/store";
import { viewsSlice } from "apps/security/configuration/views/store";
import { operationsSlice } from "apps/security/configuration/operations/store";
import { applicationSlice } from "apps/security/application/store";
import { moduleSlice } from "apps/security/module/store";
import { operationSlice } from "apps/security/operation/store";
import { dialogSlice } from "components/shared/dialog/store";

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
  history: createBrowserHistory(),
});

const store = configureStore({
  reducer: {
    router: routerReducer,
    [authSlice.name]: authSlice.reducer,
    [tablesSlice.name]: tablesSlice.reducer,
    [viewsSlice.name]: viewsSlice.reducer,
    [operationsSlice.name]: operationsSlice.reducer,
    [applicationSlice.name]: applicationSlice.reducer,
    [moduleSlice.name]: moduleSlice.reducer,
    [operationSlice.name]: operationSlice.reducer,
    [dialogSlice.name]: dialogSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware),
});

export const history = createReduxHistory(store);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, AppState, unknown, Action>;

export default store;
