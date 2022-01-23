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
  disabled?: string;
  dependedModelName?: string;
  dependedModelField?: string;
  dependedFieldData?: any;
  top: number;
  left: number;
  width?: string;
  index: number;
  onEdit?(type: string, index: number): void;
  onDelete?(index: number): void;
}

export const InputElement: FC<IInputElement> = ({
  withDnd,
  variant,
  model,
  label,
  placeholder,
  required,
  disabled,
  dependedModelName,
  dependedModelField,
  dependedFieldData,
  ...rest
}) => {
  const inputValue = dependedModelField && dependedFieldData && dependedFieldData[dependedModelField];

  const input = (
    <TextField
      name={model}
      value={inputValue ?? ""}
      type={variant}
      label={label}
      placeholder={placeholder}
      required={!!required}
      disabled={!!disabled}
    />
  );

  return withDnd ? (
    <ElementWithDnd {...rest} type="input">
      {input}
    </ElementWithDnd>
  ) : (
    <Element top={rest.top} left={rest.left} width={rest.width}>
      {input}
    </Element>
  );
};
