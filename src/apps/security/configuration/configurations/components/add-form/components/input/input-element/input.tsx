import React, { CSSProperties, FC } from "react";
import { TextField } from "components/shared";

interface IInput {
  model: string;
  label: string;
  variant: "text" | "number";
  required?: string;
  placeholder?: string;
  fromConf?: boolean;
  top?: number;
  left?: number;
}

export const Input: FC<IInput> = ({ model, label, required, variant, placeholder, fromConf, top, left }) => {
  const style = {
    position: "absolute",
    transform: `translate3d(${left}px, ${top}px, 0)`,
  } as CSSProperties;

  return (
    <TextField
      name={model}
      type={variant}
      label={label}
      placeholder={placeholder}
      style={!fromConf ? style : undefined}
      required={!!required}
    />
  );
};
