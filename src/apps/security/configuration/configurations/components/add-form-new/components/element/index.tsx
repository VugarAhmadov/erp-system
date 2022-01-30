import React, { FC } from "react";

interface IElement {}

export const Element: FC<IElement> = ({ children }) => {
  return <div>{children}</div>;
};
