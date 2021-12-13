import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { HistoryRouter as Router } from "redux-first-history/rr6";
import { AuthLayout, MainLayout } from "layouts";
import { Spinner } from "components/shared";
import { history } from "store";
import { Login } from "modules/auth";

const Home = lazy(() => import("modules/home").then((module) => ({ default: module.Home })));
const Configuration = lazy(() => import("modules/configuration").then((module) => ({ default: module.Configuration })));
// const Auth = lazy(() => import("modules/auth").then((module) => ({ default: module.Auth })));

export const AppRouting = () => {
  return (
    <Router history={history}>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
          </Route>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            {/* <Route path="auth" element={<Auth />} /> */}
            <Route path="configuration" element={<Configuration />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};
