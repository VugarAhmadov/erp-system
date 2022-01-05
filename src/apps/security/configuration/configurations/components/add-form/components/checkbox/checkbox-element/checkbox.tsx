import React, { CSSProperties, FC } from "react";
import { Checkboxes } from "components/shared";

interface ICheckbox {
  model: string;
  label: string;
  required?: string;
  fromConf?: boolean;
  top?: number;
  left?: number;
}

export const Checkbox: FC<ICheckbox> = ({ label, model, required, fromConf, top, left }) => {
  const style = {
    position: "absolute",
    transform: `translate3d(${left}px, ${top}px, 0)`,
  } as CSSProperties;

  return (
    <div style={!fromConf ? style : undefined}>
      <Checkboxes
        name={model}
        data={{
          label,
          value: "0",
        }}
        required={!!required}
      />
    </div>
  );
};
