import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AppState } from "store";

export const RouterOutlet = () => {
  const location = useLocation();
  const apps = useSelector((state: AppState) => state.auth.user.applications);

  if (location.pathname === "/") {
    return <Navigate to={apps[0].url} />;
  }

  return <Outlet />;
};
