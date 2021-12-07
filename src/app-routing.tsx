import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "layouts";
import { Spinner } from "components/shared";

const Home = lazy(() => import("modules/home").then((module) => ({ default: module.Home })));
const Configuration = lazy(() => import("modules/configuration").then((module) => ({ default: module.Configuration })));

export const AppRouting = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="configuration" element={<Configuration />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
