import { configureStore, Action, ThunkAction } from "@reduxjs/toolkit";
import { createBrowserHistory } from "history";
import { createReduxHistoryContext } from "redux-first-history";
import { authSlice } from "apps/auth/store";
import { tablesSlice } from "apps/security/configuration/tables/store";
import { viewsSlice } from "apps/security/configuration/views/store";
import { configurationsSlice } from "apps/security/configuration/configurations/store";
import { applicationSlice } from "apps/security/application/store";
import { moduleSlice } from "apps/security/module/store";
import { operationSlice } from "apps/security/operation/store";
import { commonOperationSlice } from "apps/security/common-operation/store";
import { userSlice } from "apps/security/user/store";
import { dynamicSlice } from "apps/dynamic-app/dynamic-module/store";
import { dictionarySlice } from "./dictionary";
import { userGroupSlice } from "apps/security/user-group/store";

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
  history: createBrowserHistory(),
});

const store = configureStore({
  reducer: {
    router: routerReducer,
    [authSlice.name]: authSlice.reducer,
    [dictionarySlice.name]: dictionarySlice.reducer,
    [tablesSlice.name]: tablesSlice.reducer,
    [viewsSlice.name]: viewsSlice.reducer,
    [configurationsSlice.name]: configurationsSlice.reducer,
    [applicationSlice.name]: applicationSlice.reducer,
    [moduleSlice.name]: moduleSlice.reducer,
    [operationSlice.name]: operationSlice.reducer,
    [commonOperationSlice.name]: commonOperationSlice.reducer,
    [userSlice.name]: userSlice.reducer,
    [userGroupSlice.name]: userGroupSlice.reducer,
    [dynamicSlice.name]: dynamicSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["dialogs/addDialog", "dialogs/removeDialog"],
      },
    }).concat(routerMiddleware),
});

export const history = createReduxHistory(store);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, AppState, unknown, Action>;

export default store;
