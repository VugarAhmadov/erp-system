import React, { FC, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Particles from "react-tsparticles";
import { Paper, Typography } from "@mui/material";
import { particleConfig } from "configs";
import { StyledAuthLayout } from "./auth.styled";
import { AppState } from "store";

interface IAuthLayout {}

export const AuthLayout: FC<IAuthLayout> = () => {
  const isLoggedIn = useSelector((state: AppState) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [isLoggedIn]);

  return (
    <StyledAuthLayout>
      <Particles id="tsparticles" className="particles" options={particleConfig} />
      <Paper className="content">
        <Typography variant="h4">Codeum</Typography>
        <Outlet />
      </Paper>
    </StyledAuthLayout>
  );
};
