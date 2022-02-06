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
  const { i18n } = useTranslation();

  const apps = useSelector((state: AppState) => state.auth.user.applications);
  // const selectedApp =
  //   location.pathname === "/" ? apps[0] : apps.filter((app) => app.url === `/${location.pathname.split("/")[1]}`)[0];

  return (
    <StyledSidebar>
      <Typography variant="body1" className="app-name">
        CODEUM
        <br />
        SYSTEM
      </Typography>
      <nav aria-label="sidebarnav" className="nav-menu">
        <List>
          {apps.map((app) => (
            <ListItem key={app.id}>
              <ListItemButton
                selected={app.url === `/${location.pathname.split("/")[1]}`}
                component={Link}
                to={app.url ?? "/"}
              >
                <ListItemIcon>
                  <Icon fontSize="large">{app.icon || "layers"}</Icon>
                </ListItemIcon>
                <ListItemText primary={app.shortName[i18n.language as keyof typeof app.shortName]} />
              </ListItemButton>
            </ListItem>
          ))}
          {/* {selectedApp.modules
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
            ))} */}
        </List>
      </nav>
    </StyledSidebar>
  );
};
