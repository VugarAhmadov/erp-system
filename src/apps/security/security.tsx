import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const Security = () => {
  const location = useLocation();

  return <Outlet />;
  // return location.pathname.split("/").length === 2 ? <Navigate to={()} /> : <Outlet />;
};
