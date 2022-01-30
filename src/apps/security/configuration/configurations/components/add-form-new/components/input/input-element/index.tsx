import React, { FC } from "react";
import { TextField } from "components/shared";
import { ElementWithDnd, Element } from "../..";

interface IInputElement {
  withDnd?: boolean;
  rowIndex: number;
  columnIndex: number;
  params: any;
  model?: string;
  variant?: "text" | "number";
  label?: string;
  placeholder?: string;
  required?: string;
  disabled?: string;
  dependedModelName?: string;
  dependedModelField?: string;
  dependedFieldData?: any;
  onEdit?(type: string, rowIndex: number, columnIndex: number): void;
  onDelete?(rowIndex: number, columnIndex: number): void;
}

export const InputElement: FC<IInputElement> = ({
  withDnd,
  variant = "text",
  model,
  label,
  placeholder,
  required,
  disabled,
  dependedModelName,
  dependedModelField,
  dependedFieldData,
  params,
  ...rest
}) => {
  const inputValue = dependedModelField && dependedFieldData && dependedFieldData[dependedModelField];

  const input = (
    <TextField
      name={model || "test"}
      value={inputValue ?? ""}
      type={variant}
      label={label}
      placeholder={placeholder}
      required={!!required}
      disabled={!!disabled}
    />
  );

  return withDnd ? (
    <ElementWithDnd {...rest} type="input" params={params}>
      {input}
    </ElementWithDnd>
  ) : (
    <Element>{input}</Element>
  );
};
