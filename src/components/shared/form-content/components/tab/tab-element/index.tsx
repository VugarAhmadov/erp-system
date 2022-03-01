import React, { FC, useState } from "react";
import { Tab, Tabs } from "@mui/material";
import { Content } from "../../..";
import { ITabParams } from "../../../types";
import { TabPanel } from "components/shared";

// export interface ITabParams {
//   tabs?: ITabs[];
//   label?: string;
// }

interface ITabs {
  index: number;
  label: string;
}

interface ITabElement {
  tab: any;
}

const a11yProps = (index: number) => ({
  id: `simple-tab-${index}`,
  "aria-controls": `simple-tabpanel-${index}`,
});

export const TabElement: FC<ITabElement> = ({ tab }) => {
  const { params, id, children } = tab;

  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div style={{ width: "100%" }}>
      <Tabs
        value={selectedTab}
        onChange={(event, newValue) => setSelectedTab(newValue)}
        aria-label="basic tabs example"
      >
        {tab.params.tabs.map((tab: any, index: number) => (
          <Tab label={tab.label} {...a11yProps(index)} key={index} />
        ))}
      </Tabs>
      {children?.map((content: any, index: number) => (
        <TabPanel value={selectedTab} index={index} key={index} style={{ padding: "1.5rem 0" }}>
          <Content content={content.children} />
        </TabPanel>
      ))}
    </div>
  );
};
