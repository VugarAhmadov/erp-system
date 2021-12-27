import React, { FC, MouseEvent, useState } from "react";
import { Button, Icon, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Select } from "components/shared";
import { AppState } from "store";
import { StyledAppsMenu, StyledHeader } from "./header.styled";

export const Header: FC = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const [appMenu, setAppMenu] = useState<HTMLElement | null>(null);
  const apps = useSelector((state: AppState) => state.application.applications.r);

  return (
    <StyledHeader>
      <div className="lang-container">
        <Form
          onSubmit={() => {}}
          render={() => (
            <Select
              name="lang"
              value={i18n.language}
              data={[
                { label: "az", value: "az" },
                { label: "en", value: "en" },
                { label: "ru", value: "ru" },
              ]}
              inputProps={{
                onChange: (e: any) => {
                  i18n.changeLanguage(e.target.value);
                },
              }}
              showEmptyLabel={false}
              IconComponent={() => <></>}
            />
          )}
        />
      </div>

      <div className="apps-container">
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
              <ListItemText>{app.name}</ListItemText>
            </MenuItem>
          ))}
        </StyledAppsMenu>
      </div>
    </StyledHeader>
  );
};
