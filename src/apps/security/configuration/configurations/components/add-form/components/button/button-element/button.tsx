import React, { CSSProperties, FC } from "react";
import { Icon, IconButton, Button as MuiButton } from "@mui/material";

export interface IButton {
  sort: "icon" | "button" | "link";
  size: "small" | "medium" | "large";
  variant: "text" | "outlined" | "contained";
  color: "error" | "info" | "warning" | "success" | "inherit" | "primary" | "secondary";
  iconName?: string;
  linkUrl?: string;
  label: string;
  fromConf?: boolean;
  top?: number;
  left?: number;
}

export const Button: FC<IButton> = ({ label, variant, size, iconName, color, sort, linkUrl, fromConf, top, left }) => {
  const style = {
    position: "absolute",
    transform: `translate3d(${left}px, ${top}px, 0)`,
  } as CSSProperties;

  return sort === "icon" ? (
    <IconButton size={size} color={color} style={!fromConf ? style : undefined}>
      <Icon>{iconName}</Icon>
    </IconButton>
  ) : (
    <MuiButton
      variant={variant}
      style={!fromConf ? style : undefined}
      href={sort === "link" ? linkUrl : undefined}
      size={size}
      color={color}
    >
      {label}
    </MuiButton>
  );
};
