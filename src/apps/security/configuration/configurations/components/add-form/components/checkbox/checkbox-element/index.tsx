import React, { FC } from "react";
import { Checkboxes } from "components/shared";
import { ElementWithDnd, Element } from "../..";

interface ICheckboxElement {
  withDnd?: boolean;
  model: string;
  label: string;
  required?: string;
  top: number;
  left: number;
  width?: string;
  index: number;
  onEdit?(type: string, index: number): void;
  onDelete?(index: number): void;
}

export const CheckboxElement: FC<ICheckboxElement> = ({ withDnd, label, model, required, ...rest }) => {
  const checkbox = (
    <Checkboxes
      name={model}
      data={{
        label,
        value: "0",
      }}
      required={!!required}
    />
  );

  return withDnd ? (
    <ElementWithDnd {...rest} type="checkbox">
      {checkbox}
    </ElementWithDnd>
  ) : (
    <Element top={rest.top} left={rest.left} width={rest.width}>
      {checkbox}
    </Element>
  );
};
