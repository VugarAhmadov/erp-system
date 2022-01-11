import React, { FC } from "react";
import { TextField } from "components/shared";
import { ElementWithDnd, Element } from "../..";

interface IInputElement {
  withDnd?: boolean;
  model: string;
  variant: "text" | "number";
  label: string;
  placeholder: string;
  required?: string;
  top: number;
  left: number;
  index: number;
  handleEdit?(type: string, index: number): void;
  handleDelete?(index: number): void;
}

export const InputElement: FC<IInputElement> = ({ withDnd, variant, model, label, placeholder, required, ...rest }) => {
  const input = () => (
    <TextField name={model} type={variant} label={label} placeholder={placeholder} required={!!required} />
  );

  return withDnd ? (
    <ElementWithDnd {...rest} type="input">
      {input()}
    </ElementWithDnd>
  ) : (
    <Element top={rest.top} left={rest.left}>
      {input()}
    </Element>
  );
};
