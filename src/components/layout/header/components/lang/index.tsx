import React from "react";
import { MenuItem, Select } from "@mui/material";
import { useTranslation } from "react-i18next";
import { StyledLang } from "./lang.styled";

export const Lang = () => {
  const { i18n } = useTranslation();

  return (
    <StyledLang>
      <Select
        name="lang"
        value={i18n.language}
        inputProps={{
          onChange: (e: any) => {
            i18n.changeLanguage(e.target.value);
          },
        }}
        IconComponent={() => <></>}
      >
        <MenuItem value="az">az</MenuItem>
        <MenuItem value="en">en</MenuItem>
        <MenuItem value="ru">ru</MenuItem>
      </Select>
    </StyledLang>
  );
};
