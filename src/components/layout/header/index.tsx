import React, { FC } from "react";
import { StyledHeader } from "./header.styled";
import { Lang, Apps, Profile } from "./components";

export const Header: FC = () => {
  return (
    <StyledHeader>
      <Profile />
      <Lang />
      <Apps />
    </StyledHeader>
  );
};
