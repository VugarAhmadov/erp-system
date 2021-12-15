import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { a11yProps } from "helpers";
import { StyledConfiguration } from "./configuration.styled";
import { Operations, Views } from "./components";
import { TabPanel } from "components/shared";
import { getViews, getTables } from "./store/actions";

export const Configuration = () => {
  const [value, setValue] = useState(0);
  const { t } = useTranslation("common");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getViews());
    dispatch(getTables());
  }, []);

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
        <Views />
      </TabPanel>
    </StyledConfiguration>
  );
};
