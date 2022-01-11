import React, { FC } from "react";
import { IElementWithDnd, ElementWithDnd } from "../..";
import { Button } from "./button";

interface IButtonElement extends IElementWithDnd {
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
  const buttonProps = { label, variant, size, iconName, color, sort, linkUrl };

  return (
    <ElementWithDnd {...rest} type="button">
      <Button {...buttonProps} fromConf />
    </ElementWithDnd>
  );
};
