import React, { FC } from "react";
import { Typography } from "@mui/material";
import { ElementWithDnd, Element } from "../..";

interface ILabelElement {
  withDnd?: boolean;
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
  top: number;
  left: number;
  width?: string;
  index: number;
  handleEdit?(type: string, index: number): void;
  handleDelete?(index: number): void;
}

export const LabelElement: FC<ILabelElement> = ({ withDnd, label, variant, ...rest }) => {
  const labelComp = <Typography variant={variant}>{label}</Typography>;

  return withDnd ? (
    <ElementWithDnd {...rest} type="label">
      {labelComp}
    </ElementWithDnd>
  ) : (
    <Element top={rest.top} left={rest.left} width={rest.width}>
      {labelComp}
    </Element>
  );
};
