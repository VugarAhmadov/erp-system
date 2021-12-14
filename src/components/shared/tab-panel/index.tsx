import React, { FC } from "react";

interface ITabPanel {
  index: number;
  value: number;
}

export const TabPanel: FC<ITabPanel> = ({ children, index, value }) => {
  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`}>
      {value === index && children}
    </div>
  );
};
