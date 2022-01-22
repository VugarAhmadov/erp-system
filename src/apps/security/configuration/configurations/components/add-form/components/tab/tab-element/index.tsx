import React, { FC, useState } from "react";
import { Tab, Tabs, Typography } from "@mui/material";
import { ElementWithDnd, Element } from "../..";
import { TabPanel } from "components/shared";

interface ITabs {
  index: number;
  label: string;
}

interface ITabElement {
  withDnd?: boolean;
  tabs: ITabs[];
  label: string;
  top: number;
  left: number;
  width?: string;
  index: number;
  onEdit?(type: string, index: number): void;
  onDelete?(index: number): void;
}

const a11yProps = (index: number) => ({
  id: `simple-tab-${index}`,
  "aria-controls": `simple-tabpanel-${index}`,
});

export const TabElement: FC<ITabElement> = ({ withDnd, label, tabs, ...rest }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const tabComp = (
    <div style={{ width: "100%" }}>
      <Tabs
        value={selectedTab}
        onChange={(event, newValue) => setSelectedTab(newValue)}
        aria-label="basic tabs example"
      >
        {tabs.map((tab, index) => (
          <Tab label={tab.label} {...a11yProps(index)} />
        ))}
      </Tabs>
      {tabs.map((tab, index) => (
        <TabPanel value={selectedTab} index={index}>
          {tab.label}
        </TabPanel>
      ))}
    </div>
  );

  return withDnd ? (
    <ElementWithDnd {...rest} type="tab">
      {tabComp}
    </ElementWithDnd>
  ) : (
    <Element top={rest.top} left={rest.left} width={rest.width}>
      {tabComp}
    </Element>
  );
};
