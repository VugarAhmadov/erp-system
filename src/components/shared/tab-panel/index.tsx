import React, { CSSProperties, FC } from "react";

interface ITabPanel {
  index: number;
  value: number;
  style?: CSSProperties;
}

export const TabPanel: FC<ITabPanel> = ({ children, index, value, style }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      style={style}
    >
      {value === index && children}
    </div>
  );
};
