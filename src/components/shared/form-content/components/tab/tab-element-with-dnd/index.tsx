import React, { FC, memo, useState } from "react";
import { useDrag } from "react-dnd";
import { Tab, Tabs } from "@mui/material";
import { ActionPanel, Components, ContentWithDnd } from "../../..";
import { StyledTabElementWithDnd } from "./tab-element-with-dnd.styled";
import { TabPanel } from "components/shared";

interface ITabElementWithDnd {
  tab: any;
  onEdit(type: string, id: string): void;
  onDelete(id: string): void;
}

export const TabElementWithDnd: FC<ITabElementWithDnd> = memo(({ tab, onEdit, onDelete }) => {
  const { params, id, children } = tab;

  const [selectedTab, setSelectedTab] = useState(0);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: Components.ELEMENT,
      item: { type: "tab", move: true, id, params },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id]
  );

  const a11yProps = (index: number) => ({
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  });

  return (
    <StyledTabElementWithDnd
      ref={drag}
      style={{
        height: isDragging ? 0 : "auto",
        opacity: isDragging ? 0 : 1,
      }}
      orientation={params.orientation}
    >
      <div className="tab-container">
        <Tabs
          value={selectedTab}
          onChange={(event, newValue) => setSelectedTab(newValue)}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons="auto"
          orientation={params.orientation}
        >
          {tab.params.tabs.map((tab: any, index: number) => (
            <Tab label={tab.label} {...a11yProps(index)} key={index} />
          ))}
        </Tabs>
        {children?.map((content: any, index: number) => (
          <TabPanel value={selectedTab} index={index} key={index} className="tab-panel">
            <ContentWithDnd content={content.children} id={content.id} type="tab" />
          </TabPanel>
        ))}
      </div>

      <ActionPanel onDeleteClick={() => onDelete!(id)} onEditClick={() => onEdit!("tab", id)} />
    </StyledTabElementWithDnd>
  );
});
