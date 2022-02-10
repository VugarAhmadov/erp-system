import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AppState } from "store";
import { setSelectedModule } from "store/common";
import { NotFound } from "..";

export const RouterOutlet = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const apps = useSelector((state: AppState) => state.auth.user.applications);

  switch (location.pathname.split("/").length) {
    case 2:
      if (location.pathname === "/") {
        return <Navigate to={apps[0].url} />;
      } else if (apps.find((app) => app.url === location.pathname)) {
        return <Outlet />;
      } else {
        return <NotFound />;
      }
    case 3:
      const module = apps
        .find((app) => app.url === `/${location.pathname.split("/")[1]}`)
        ?.modules.find((module) => module.url === `/${location.pathname.split("/")[2]}`);

      if (module) {
        dispatch(setSelectedModule(module));
        return <Outlet />;
      } else {
        return <NotFound />;
      }
    default:
      return <NotFound />;
  }
};
