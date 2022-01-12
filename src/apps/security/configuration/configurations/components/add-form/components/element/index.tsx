import React, { CSSProperties, FC } from "react";

interface IElement {
  left: number;
  top: number;
  width?: string;
  height?: string;
}

export const Element: FC<IElement> = ({ children, left, top, width, height }) => {
  const style = {
    position: "absolute",
    transform: `translate3d(${left}px, ${top}px, 0)`,
    width: width ? parseInt(width) : "auto",
    height: height ? parseInt(height) : "auto",
  } as CSSProperties;

  return <div style={style}>{children}</div>;
};
