import React, { FC } from "react";
import { Radios } from "components/shared";
import { ElementWithDnd, Element } from "../../..";
import { RadioData } from "components/shared/form/radios";

export interface IRadioParams {
  table: string;
  model?: string;
  label?: string;
  radioData?: RadioData[];
  required?: string;
  direction?: string;
}

interface IRadioElement {
  withDnd?: boolean;
  params: IRadioParams;
  id: string;
  onEdit?(type: string, id: string): void;
  onDelete?(id: string): void;
}

export const RadioElement: FC<IRadioElement> = ({ withDnd, params, ...rest }) => {
  const { label, model, radioData, direction, required } = params;

  const radio = (
    <Radios
      name={model || `model-${rest.id}`}
      label={label}
      data={radioData || []}
      required={!!required}
      radioGroupProps={{ row: direction === "row" }}
    />
  );

  return withDnd ? (
    <ElementWithDnd {...rest} type="radio" params={params}>
      {radio}
    </ElementWithDnd>
  ) : (
    <Element>{radio}</Element>
  );
};
