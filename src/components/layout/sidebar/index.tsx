import React, { FC } from "react";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Icon, Typography } from "@mui/material";
import { StyledSidebar } from "./sidebar.styled";
import { useSelector } from "react-redux";
import { AppState } from "store";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { checkUserAccess } from "helpers";

export const Sidebar: FC = () => {
  const location = useLocation();
  const apps = useSelector((state: AppState) => state.auth.user.applications);
  const selectedApp = apps.filter((app) => app.url === `/${location.pathname.split("/")[1]}`)[0];
  const { i18n } = useTranslation();

  return (
    <StyledSidebar>
      <Typography variant="h5" className="app-name">
        CODEUM SYSTEM
      </Typography>
      <nav aria-label="sidebarnav" className="nav-menu">
        <List>
          {selectedApp.modules
            ?.filter((module) => checkUserAccess(module, "ALL_VIEW"))
            ?.map((module) => (
              <ListItem key={module.id}>
                <ListItemButton
                  selected={`${selectedApp.url}${module.url}` === location.pathname}
                  component={Link}
                  to={`${selectedApp.url}${module.url}` ?? "/"}
                >
                  <ListItemIcon>
                    <Icon>{module.icon || "layers"}</Icon>
                  </ListItemIcon>
                  <ListItemText primary={module.name[i18n.language as keyof typeof module.name]} />
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      </nav>
    </StyledSidebar>
  );
};
