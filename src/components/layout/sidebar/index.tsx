import React, { FC } from "react";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Icon } from "@mui/material";
import { StyledSidebar } from "./sidebar.styled";

export const Sidebar: FC = () => {
  return (
    <StyledSidebar>
      <nav aria-label="sidebarnav">
        <List>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <Icon>star</Icon>
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Icon>star</Icon>
              </ListItemIcon>
              <ListItemText primary="Drafts" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </StyledSidebar>
  );
};
