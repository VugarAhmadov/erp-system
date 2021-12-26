import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { HistoryRouter as Router } from "redux-first-history/rr6";
import { AuthLayout, MainLayout } from "layouts";
import { Spinner } from "components/shared";
import { history } from "store";
import { Security } from "apps/security";

const Login = lazy(() => import("apps/auth").then((module) => ({ default: module.Login })));

const Configuration = lazy(() =>
  import("apps/security/configuration").then((module) => ({ default: module.Configuration }))
);

const Application = lazy(() => import("apps/security/application").then((module) => ({ default: module.Application })));
const Module = lazy(() => import("apps/security/module").then((module) => ({ default: module.Module })));
const Operation = lazy(() => import("apps/security/operation").then((module) => ({ default: module.Operation })));

export const AppRouting = () => {
  return (
    <Router history={history}>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
          </Route>
          <Route path="/" element={<MainLayout />}>
            <Route path="security" element={<Security />}>
              <Route path="configuration" element={<Configuration />} />
              <Route path="application" element={<Application />} />
              <Route path="module" element={<Module />} />
              <Route path="operation" element={<Operation />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};
