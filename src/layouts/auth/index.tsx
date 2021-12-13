import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import Particles from "react-tsparticles";
import { Paper, Typography } from "@mui/material";
import { particleConfig } from "configs";
import { StyledAuthLayout } from "./auth.styled";

interface IAuthLayout {}

export const AuthLayout: FC<IAuthLayout> = () => {
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
