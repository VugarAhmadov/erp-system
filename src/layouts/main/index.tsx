import React, { FC, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Header, Sidebar } from "components/layout";
import { StyledMainLayout } from "./main.styled";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "store";
import { checkUser } from "modules/auth/store/actions";
import { Spinner } from "components/shared";

export const MainLayout: FC = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state: AppState) => state.auth);
  const navigate = useNavigate();
  const token = localStorage.getItem("codeum_jwt_token");

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    } else {
      if (!authState.isLoggedIn) {
        dispatch(checkUser());
      }
    }
  }, [token]);

  return !authState.loading.checkUser ? (
    <StyledMainLayout>
      <Sidebar />
      <div className="content">
        <Header />
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </StyledMainLayout>
  ) : (
    <Spinner />
  );
};
