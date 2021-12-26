import { Icon, IconButton, Menu, MenuItem } from "@mui/material";
import { Select } from "components/shared";
import React, { FC } from "react";
import { Form } from "react-final-form";
import { useSelector } from "react-redux";
import { AppState } from "store";
import { StyledHeader } from "./header.styled";

export const Header: FC = () => {
  const apps = useSelector((state: AppState) => state.application.applications.r);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledHeader>
      <div className="lang">
        <Form
          onSubmit={() => {}}
          render={() => (
            <Select
              name="lang"
              value="az"
              data={[
                { label: "az", value: "az" },
                { label: "en", value: "en" },
                { label: "ru", value: "ru" },
              ]}
              inputProps={{
                onChange: (e: any) => {
                  // router.push(router.pathname, undefined, { locale: e.target.value });
                },
              }}
            />
          )}
        />
      </div>
      <div className="apps">
        <IconButton
          aria-label="more"
          id="long-button"
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <Icon>apps</Icon>
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {apps.map((app) => (
            <MenuItem key={app.id} onClick={handleClose}>
              {app.name}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </StyledHeader>
  );
};
