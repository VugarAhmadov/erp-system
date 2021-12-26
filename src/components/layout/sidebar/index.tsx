import React, { FC } from "react";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Icon, Typography } from "@mui/material";
import { StyledSidebar } from "./sidebar.styled";
import { useSelector } from "react-redux";
import { AppState } from "store";
import { Link, useLocation } from "react-router-dom";

export const Sidebar: FC = () => {
  const modules = useSelector((state: AppState) => state.module.modules.r);
  const location = useLocation();

  return (
    <StyledSidebar>
      <Typography variant="h5" className="app-name">
        CODEUM SYSTEM
      </Typography>
      <nav aria-label="sidebarnav" className="nav-menu">
        <List>
          {modules?.map((module) => (
            <ListItem key={module.id}>
              <ListItemButton selected={module.url === location.pathname} component={Link} to={module.url}>
                <ListItemIcon>
                  <Icon>{module.icon || "layers"}</Icon>
                </ListItemIcon>
                <ListItemText primary={module.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
    </StyledSidebar>
  );
};
