import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Icon } from "@mui/material";
import { checkUserAccess } from "helpers";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { AppState } from "store";

export const Security = () => {
  const location = useLocation();
  const { i18n } = useTranslation();

  const modules = useSelector(
    (state: AppState) => state.auth.user.applications.find((app) => app.url === location.pathname)!.modules
  );

  return (
    <div>
      <List disablePadding>
        {modules
          ?.filter((module) => checkUserAccess(module, "ALL_VIEW"))
          ?.map((module) => (
            <ListItem key={module.id} disableGutters disablePadding>
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
