import React, { FC } from "react";
import { particleConfig } from "configs";
import Particles from "react-tsparticles";

interface IAuthLayout {}

export const AuthLayout: FC<IAuthLayout> = ({ children }) => {
  return (
    <div>
      <Particles id="tsparticles" options={particleConfig} />
      <div>{children}</div>
    </div>
  );
};
