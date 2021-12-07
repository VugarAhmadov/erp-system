import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import { Header, Sidebar } from "components/layout";
import { StyledMainLayout } from "./main-layout.styled";

export const MainLayout: FC = () => {
  return (
    <StyledMainLayout>
      <Sidebar />
      <div className="content">
        <Header />
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </StyledMainLayout>
  );
};
