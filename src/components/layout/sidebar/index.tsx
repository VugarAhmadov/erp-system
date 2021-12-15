import React, { FC } from "react";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Icon, Typography } from "@mui/material";
import { StyledSidebar } from "./sidebar.styled";
import { useSelector } from "react-redux";
import { AppState } from "store";
import { IModule } from "modules/auth/store/types";

export const Sidebar: FC = () => {
  const modules = useSelector((state: AppState) => state.auth.user?.applications[0]?.modules);

  return (
    <StyledSidebar>
      <Typography variant="h5" className="app-name">
        CODEUM SYSTEM
      </Typography>
      <nav aria-label="sidebarnav" className="nav-menu">
        <List>
          {modules.map((module: IModule) => (
            <ListItem key={module.id}>
              <ListItemButton selected={module.id === "1900000000"}>
                <ListItemIcon>
                  <Icon>{module.icon || "layers"}</Icon>
                </ListItemIcon>
                <ListItemText primary={module.name.az} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
    </StyledSidebar>
  );
};
