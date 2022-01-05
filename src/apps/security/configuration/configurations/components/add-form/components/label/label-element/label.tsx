import React, { CSSProperties, FC } from "react";
import { Typography } from "@mui/material";

interface ILabel {
  variant:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "caption"
    | "button"
    | "overline"
    | "inherit";
  label: string;
  fromConf?: boolean;
  top?: number;
  left?: number;
}

export const Label: FC<ILabel> = ({ variant, label, fromConf, top, left }) => {
  const style = {
    position: "absolute",
    transform: `translate3d(${left}px, ${top}px, 0)`,
  } as CSSProperties;

  return (
    <Typography variant={variant} style={!fromConf ? style : undefined}>
      {label}
    </Typography>
  );
};
