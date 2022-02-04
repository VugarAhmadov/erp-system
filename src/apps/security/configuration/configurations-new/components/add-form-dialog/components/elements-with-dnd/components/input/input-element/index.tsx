import React, { FC } from "react";
import { TextField } from "components/shared";
import { ElementWithDnd, Element } from "../..";

export interface IInputParams {
  table?: string;
  views?: string;
  componentType?: string;
  model?: string;
  variant?: "text" | "number";
  label?: string;
  placeholder?: string;
  required?: string;
  disabled?: string;
  dependedModelName?: string;
  dependedModelField?: string;
}

interface IInputElement {
  withDnd?: boolean;
  params: IInputParams;
  dependedFieldData?: any;
  gridRowIndex: number;
  gridColumnIndex: number;
  onEdit?(type: string, gridRowIndex: number, gridColumnIndex: number): void;
  onDelete?(gridRowIndex: number, gridColumnIndex: number): void;
}

export const InputElement: FC<IInputElement> = ({ withDnd, params, dependedFieldData, ...rest }) => {
  const {
    variant = "text",
    model,
    label,
    placeholder,
    required,
    disabled,
    dependedModelName,
    dependedModelField,
  } = params;

  const inputValue = dependedModelField && dependedFieldData && dependedFieldData[dependedModelField];

  const input = (
    <TextField
      name={model || `model-${rest.gridRowIndex}-${rest.gridColumnIndex}`}
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
