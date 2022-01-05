import React, { FC } from "react";
import { Typography } from "@mui/material";
import { Element, IElement } from "../..";
import { t } from "i18next";

interface ILabelElement extends IElement {
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
}

export const LabelElement: FC<ILabelElement> = ({ label, variant, ...rest }) => {
  return (
    <Element {...rest} type="label">
      {/* {label && t(label)} */}
      <Typography variant={variant}>{label}</Typography>
    </Element>
  );
};
