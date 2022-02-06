import React from "react";
import { List, ListItem, ListItemButton, ListItemIcon, Icon, ListItemText } from "@mui/material";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { checkUserAccess } from "helpers";
import { AppState } from "store";

export const DynamicApp = () => {
  const location = useLocation();
  const { i18n } = useTranslation();

  const modules = useSelector(
    (state: AppState) => state.auth.user.applications.find((app) => app.url === location.pathname)!.modules
  );

  return (
    <div>
      <List>
        {modules
          ?.filter((module) => checkUserAccess(module, "ALL_VIEW"))
          ?.map((module) => (
            <ListItem key={module.id}>
              <ListItemButton component={Link} to={`${location.pathname}${module.url}` ?? "/"}>
                <ListItemIcon>
                  <Icon>{module.icon || "layers"}</Icon>
                </ListItemIcon>
                <ListItemText primary={module.name[i18n.language as keyof typeof module.name]} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </div>
  );
};
