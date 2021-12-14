import React, { useState } from "react";
import { Tab, Tabs } from "@mui/material";
import { StyledConfiguration } from "./configuration.styled";
import { Operations } from "./components";
import { TabPanel } from "components/shared";
import { useTranslation } from "react-i18next";

export const Configuration = () => {
  const [value, setValue] = useState(0);
  const { t } = useTranslation("common");

  const a11yProps = (index: number) => ({
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <StyledConfiguration>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab label={t("configurations")} {...a11yProps(0)} />
        <Tab label={t("tables")} {...a11yProps(1)} />
        <Tab label={t("views")} {...a11yProps(2)} />
      </Tabs>

      <TabPanel value={value} index={0}>
        <Operations />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </StyledConfiguration>
  );
};
