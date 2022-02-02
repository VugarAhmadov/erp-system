import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { a11yProps } from "helpers";
import { StyledConfiguration } from "./configuration.styled";
import { TabPanel } from "components/shared";
import { Configurations } from "./configurations-new";
import { Tables } from "./tables";
import { Views } from "./views";
import { getAll as getAllViews } from "./views/store/actions";
import { getAll as getAllTables } from "./tables/store/actions";

export const Configuration = () => {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);

  useEffect(() => {
    dispatch(getAllViews());
    dispatch(getAllTables());
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
        <Configurations />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Tables />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Views />
      </TabPanel>
    </StyledConfiguration>
  );
};
