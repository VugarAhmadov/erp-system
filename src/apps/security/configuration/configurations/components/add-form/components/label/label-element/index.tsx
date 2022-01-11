import React, { FC } from "react";
import { ElementWithDnd, IElementWithDnd } from "../..";
import { Label } from "./label";

interface ILabelElement extends IElementWithDnd {
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
  const labelProps = { label, variant };

  return (
    <ElementWithDnd {...rest} type="label">
      <Label {...labelProps} fromConf />
    </ElementWithDnd>
  );
};
