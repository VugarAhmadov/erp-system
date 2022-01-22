import React, { FC } from "react";
import { Icon, IconButton, Button as MuiButton } from "@mui/material";
import { ElementWithDnd, Element } from "../..";

interface IButtonElement {
  withDnd?: boolean;
  sort: "icon" | "button" | "link";
  size: "small" | "medium" | "large";
  variant: "text" | "outlined" | "contained";
  color: "error" | "info" | "warning" | "success" | "inherit" | "primary" | "secondary";
  iconName?: string;
  linkUrl?: string;
  label: string;
  top: number;
  left: number;
  width?: string;
  index: number;
  onEdit?(type: string, index: number): void;
  onDelete?(index: number): void;
}

export const ButtonElement: FC<IButtonElement> = ({
  withDnd,
  label,
  variant,
  size,
  iconName,
  color,
  sort,
  linkUrl,
  ...rest
}) => {
  const button =
    sort === "icon" ? (
      <IconButton size={size} color={color}>
        <Icon>{iconName}</Icon>
      </IconButton>
    ) : (
      <MuiButton variant={variant} href={sort === "link" ? linkUrl : undefined} size={size} color={color} fullWidth>
        {label}
      </MuiButton>
    );

  return withDnd ? (
    <ElementWithDnd {...rest} type="button">
      {button}
    </ElementWithDnd>
  ) : (
    <Element top={rest.top} left={rest.left} width={rest.width}>
      {button}
    </Element>
  );
};
