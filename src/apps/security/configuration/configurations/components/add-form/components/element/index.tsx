import React, { CSSProperties, FC } from "react";

interface IElement {
  left: number;
  top: number;
  width?: string;
}

export const Element: FC<IElement> = ({ children, left, top, width }) => {
  const style = {
    position: "absolute",
    transform: `translate3d(${left}px, ${top}px, 0)`,
    width: width ? parseInt(width) : "auto",
  } as CSSProperties;

  return <div style={style}>{children}</div>;
};
