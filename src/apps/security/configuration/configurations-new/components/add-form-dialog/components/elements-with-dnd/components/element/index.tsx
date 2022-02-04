import React, { FC } from "react";
import { StyledElement } from "./element.styled";

interface IElement {}

export const Element: FC<IElement> = ({ children }) => {
  return <StyledElement>{children}</StyledElement>;
};
