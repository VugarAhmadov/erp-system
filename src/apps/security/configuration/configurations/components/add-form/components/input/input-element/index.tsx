import React, { FC } from "react";
import { TextField } from "components/shared";
import { Element, IElement } from "../..";
import { Input } from "./input";

interface IInputElement extends IElement {
  model: string;
  variant: "text" | "number";
  label: string;
  placeholder: string;
  required?: string;
}

export const InputElement: FC<IInputElement> = ({ variant, model, label, placeholder, required, ...rest }) => {
  const inputProps = { variant, model, label, placeholder, required };

  return (
    <Element {...rest} type="input">
      <Input {...inputProps} fromConf />
    </Element>
  );
};
