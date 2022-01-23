import React, { FC } from "react";
import { Checkboxes, Radios } from "components/shared";
import { ElementWithDnd, Element } from "../..";
import { RadioData } from "components/shared/form/radios";

interface IRadioElement {
  withDnd?: boolean;
  model: string;
  label: string;
  radioData: RadioData[];
  required?: string;
  direction: string;
  top: number;
  left: number;
  width?: string;
  index: number;
  onEdit?(type: string, index: number): void;
  onDelete?(index: number): void;
}

export const RadioElement: FC<IRadioElement> = ({ withDnd, label, model, radioData, direction, required, ...rest }) => {
  const radio = (
    <Radios
      name={model}
      label={label}
      data={radioData}
      required={!!required}
      radioGroupProps={{ row: direction === "row" }}
    />
  );

  return withDnd ? (
    <ElementWithDnd {...rest} type="radio">
      {radio}
    </ElementWithDnd>
  ) : (
    <Element top={rest.top} left={rest.left} width={rest.width}>
      {radio}
    </Element>
  );
};
