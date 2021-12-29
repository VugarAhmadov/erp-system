import React, { FC } from "react";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Icon, Typography } from "@mui/material";
import { StyledSidebar } from "./sidebar.styled";
import { useSelector } from "react-redux";
import { AppState } from "store";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Sidebar: FC = () => {
  const modules = useSelector((state: AppState) => state.auth.user.applications[0].modules);
  const location = useLocation();
  const { i18n } = useTranslation();

  return (
    <StyledSidebar>
      <Typography variant="h5" className="app-name">
        CODEUM SYSTEM
      </Typography>
      <nav aria-label="sidebarnav" className="nav-menu">
        <List>
          {modules?.map((module) => (
            <ListItem key={module.id}>
              <ListItemButton
                selected={module.url === location.pathname}
                component={Link}
                to={`${process.env.PUBLIC_URL}/${module.url}` ?? "/codeum_react/"}
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
