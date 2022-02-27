import React, { FC } from "react";
import { TextField } from "components/shared";
import { ElementWithDnd, Element } from "../../..";

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
  id: number;
  onEdit?(type: string, id: number): void;
  onDelete?(id: number): void;
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

  // const inputValue = dependedModelField && dependedFieldData && dependedFieldData[dependedModelField];

  const input = (
    <TextField
      name={model || `model-${rest.id}`}
      // value={inputValue ?? undefined}
      type={variant}
      label={label}
      placeholder={placeholder}
      required={!!required}
      disabled={!!disabled}
      fullWidth
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