import React, { CSSProperties, FC } from "react";

interface IElement {
  left: number;
  top: number;
  width?: number;
}

export const Element: FC<IElement> = ({ children, left, top, width }) => {
  const style = {
    position: "absolute",
    transform: `translate3d(${left}px, ${top}px, 0)`,
    width: width ?? "auto",
  } as CSSProperties;

  return <div style={style}>{children}</div>;
};
