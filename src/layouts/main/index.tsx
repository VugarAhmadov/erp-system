import React, { FC, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Header, Sidebar } from "components/layout";
import { StyledMainLayout } from "./main.styled";
import { Spinner } from "components/shared";
import { AppState } from "store";
import { checkUser } from "modules/auth/store/actions";

export const MainLayout: FC = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: AppState) => state.auth.isLoggedIn);
  const user = useSelector((state: AppState) => state.auth.user);
  const navigate = useNavigate();
  const token = localStorage.getItem("codeum_jwt_token");

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    } else {
      if (!isLoggedIn) {
        dispatch(checkUser());
      }
    }
  }, [token, user]);

  return Object.keys(user).length > 0 ? (
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
