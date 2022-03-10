import React, { FC } from "react";
import { Typography } from "@mui/material";
import { ElementWithDnd, Element } from "../../..";

export interface ILabelParams {
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

interface ILabelElement {
  withDnd?: boolean;
  params: ILabelParams;
  id: string;
  onEdit?(type: string, id: string): void;
  onDelete?(id: string): void;
  onCopy?(type: string, id: string): void;
}

export const LabelElement: FC<ILabelElement> = ({ withDnd, params, ...rest }) => {
  const { label, variant } = params;

  const labelComp = <Typography variant={variant}>{label}</Typography>;

  return withDnd ? (
    <ElementWithDnd {...rest} type="label" params={params}>
      {labelComp}
    </ElementWithDnd>
  ) : (
    <Element>{labelComp}</Element>
  );
};
