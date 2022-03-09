import React, { CSSProperties, FC } from "react";

interface ITabPanel {
  index: number;
  value: number;
  style?: CSSProperties;
  className?: string;
}

export const TabPanel: FC<ITabPanel> = ({ children, index, value, style, className }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      style={style}
      className={className}
    >
      {value === index && children}
    </div>
  );
};
