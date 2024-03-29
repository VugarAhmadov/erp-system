import React, { FC } from "react";
import { Checkboxes } from "components/shared";
import { ElementWithDnd, Element } from "../../..";

export interface ICheckboxParams {
  table?: string;
  model?: string;
  label?: string;
  required?: string;
}

interface ICheckboxElement {
  withDnd?: boolean;
  params: ICheckboxParams;
  id: string;
  onEdit?(type: string, id: string): void;
  onDelete?(id: string): void;
  onCopy?(type: string, id: string): void;
}

export const CheckboxElement: FC<ICheckboxElement> = ({ withDnd, params, ...rest }) => {
  const { label, model, required } = params;

  const checkbox = (
    <Checkboxes
      name={model || `model-${rest.id}`}
      data={{
        label: label || "",
        value: "0",
      }}
      required={!!required}
    />
  );

  return withDnd ? (
    <ElementWithDnd {...rest} type="checkbox" params={params}>
      {checkbox}
    </ElementWithDnd>
  ) : (
    <Element params={params}>{checkbox}</Element>
  );
};
