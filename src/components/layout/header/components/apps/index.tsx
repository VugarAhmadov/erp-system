import React, { useState, MouseEvent } from "react";
import { Button, Icon, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppState } from "store";
import { StyledApps, StyledAppsMenu } from "./apps.styled";
import { useTranslation } from "react-i18next";

export const Apps = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const [appMenu, setAppMenu] = useState<HTMLElement | null>(null);
  const apps = useSelector((state: AppState) => state.auth.user.applications);

  return (
    <StyledApps>
      <Button
        variant="outlined"
        aria-label="more"
        id="apps-button"
        className="apps-button"
        aria-haspopup="true"
        aria-expanded={appMenu ? "true" : undefined}
        onClick={(event: MouseEvent<HTMLButtonElement>) => setAppMenu(event.currentTarget)}
        color="inherit"
      >
        <Icon>apps</Icon>
      </Button>
      <StyledAppsMenu
        id="apps-menu"
        className="apps-menu"
        MenuListProps={{
          "aria-labelledby": "apps-button",
        }}
        anchorEl={appMenu}
        open={!!appMenu}
        onClose={() => setAppMenu(null)}
      >
        {apps.map((app) => (
          <MenuItem key={app.id} onClick={() => navigate(app.url)} className="menu-item">
            <ListItemIcon>
              <Icon>{app.icon || "home"}</Icon>
            </ListItemIcon>
            <ListItemText>{app.name[i18n.language as keyof typeof app.name]}</ListItemText>
          </MenuItem>
        ))}
      </StyledAppsMenu>
    </StyledApps>
  );
};
