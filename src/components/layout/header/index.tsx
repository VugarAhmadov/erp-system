import React, { FC, MouseEvent, useState } from "react";
import { Button, Icon, MenuItem, ListItemIcon, ListItemText, Select } from "@mui/material";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppState } from "store";
import { StyledHeader } from "./header.styled";
import { Lang, Apps, Profile } from "./components";

export const Header: FC = () => {
  return (
    <StyledHeader>
      <Profile />
      <Lang />
      <Apps />
    </StyledHeader>
  );
};
