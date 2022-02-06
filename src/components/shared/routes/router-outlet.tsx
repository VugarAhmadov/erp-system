import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { setModule } from "apps/security/module/store";
import { AppState } from "store";

export const RouterOutlet = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const apps = useSelector((state: AppState) => state.auth.user.applications);
  const selectedApp = apps.find((app) => app.url === location.pathname);

  if (selectedApp) {
    return <Navigate to={`${selectedApp.url}${selectedApp.modules[0].url}`} />;
  } else if (location.pathname === "/") {
    return <Navigate to={`${apps[0].url}${apps[0].modules[0].url}`} />;
  } else {
    const selectedModule = apps
      .find((app) => app.url === `/${location.pathname.split("/")[1]}`)
      ?.modules?.find((module) => module.url === `/${location.pathname.split("/")[2]}`);

    dispatch(setModule(selectedModule!));

    return <Outlet />;
  }
};
