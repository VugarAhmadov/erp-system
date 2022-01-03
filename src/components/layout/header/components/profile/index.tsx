import React, { MouseEvent, useState } from "react";
import { Button, Icon, ListItemIcon, ListItemText, MenuItem, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { StyledProfile, StyledProfileMenu } from "./profile.styled";
import { AppState } from "store";
import { IName } from "apps/auth/store/types";
import { Img } from "react-image";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const [profileMenu, setProfileMenu] = useState<HTMLElement | null>(null);
  const navigate = useNavigate();
  const user = useSelector((state: AppState) => state.auth.user);
  const { t, i18n } = useTranslation("common");
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("codeum_jwt_token");
    navigate("/auth/login");
    // dispatch(logout());
  };

  return (
    <StyledProfile>
      <Button
        variant="outlined"
        aria-label="more"
        id="profile-button"
        className="profile-button"
        aria-haspopup="true"
        aria-expanded={profileMenu ? "true" : undefined}
        onClick={(event: MouseEvent<HTMLButtonElement>) => setProfileMenu(event.currentTarget)}
        color="inherit"
      >
        <Icon>person</Icon>
      </Button>
      <StyledProfileMenu
        id="profile-menu"
        className="profile-menu"
        MenuListProps={{
          "aria-labelledby": "profile-button",
        }}
        anchorEl={profileMenu}
        open={!!profileMenu}
        onClose={() => setProfileMenu(null)}
      >
        <div className="profile-info">
          <Img
            src={[
              `${process.env.REACT_APP_API_BASE_URL}/api/get/file/${user?.photoFilePath}`,
              "/images/admin-avatar.svg",
            ]}
            className="profile-image"
            alt={user.username}
          />
          <Typography variant="h6">
            {user.lastname} {user.firstname} {user.patronymic}
          </Typography>
          <Typography variant="body2">
            {user.username} - {user.userType}
          </Typography>
          <Typography variant="body2">{user.organization.name[i18n.language as keyof IName]}</Typography>
        </div>
        <MenuItem onClick={handleLogout} className="menu-item">
          <ListItemIcon>
            <Icon>logout</Icon>
          </ListItemIcon>
          <ListItemText>{t("logout")}</ListItemText>
        </MenuItem>
      </StyledProfileMenu>
    </StyledProfile>
  );
};
