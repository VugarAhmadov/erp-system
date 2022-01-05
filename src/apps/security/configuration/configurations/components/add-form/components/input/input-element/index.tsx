import React, { FC } from "react";
import { TextField } from "components/shared";
import { Element, IElement } from "../..";

interface IInputElement extends IElement {
  model: string;
  variant: "text" | "number";
  label: string;
  placeholder: string;
  required?: string;
}

export const InputElement: FC<IInputElement> = ({ variant, model, label, placeholder, required, ...rest }) => {
  return (
    <Element {...rest} type="input">
      <TextField
        name={model}
        type={variant}
        label={label}
        placeholder={placeholder}
        required={!!required}
        InputProps={{
          readOnly: true,
        }}
        // label={label && t(label)} !!NOTE: eslinde bele olmalidi
        // placeholder={placeholder && t(placeholder)} !!NOTE: eslinde bele olmalidi
      />
    </Element>
  );
};
