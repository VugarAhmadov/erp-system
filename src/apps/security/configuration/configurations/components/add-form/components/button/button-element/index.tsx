import React, { FC } from "react";
import { Button, Icon, IconButton } from "@mui/material";
import { IElement, Element } from "../..";

interface IButtonElement extends IElement {
  sort: "icon" | "button" | "link";
  size: "small" | "medium" | "large";
  variant: "text" | "outlined" | "contained";
  color: "error" | "info" | "warning" | "success" | "inherit" | "primary" | "secondary";
  iconName?: string;
  linkUrl?: string;
  label: string;
}

export const ButtonElement: FC<IButtonElement> = ({
  label,
  variant,
  size,
  iconName,
  color,
  sort,
  linkUrl,
  ...rest
}) => {
  return (
    <Element {...rest} type="button">
      {sort === "icon" ? (
        <IconButton size={size} color={color}>
          <Icon>{iconName}</Icon>
        </IconButton>
      ) : (
        <Button variant={variant} href={sort === "link" ? linkUrl : undefined} size={size} color={color}>
          {label}
        </Button>
      )}
    </Element>
  );
};
