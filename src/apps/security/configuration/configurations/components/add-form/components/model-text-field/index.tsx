import { Icon, IconButton, Menu, MenuItem } from "@mui/material";
import { TextField } from "components/shared";
import { FormApi } from "final-form";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyledModelField } from "./model-text-field.styled";

interface IModelTextField {
  menuData: string[];
  form: FormApi<any, Partial<any>>;
  fieldName: string;
  fieldLabel: string;
}

export const ModelTextField: FC<IModelTextField> = ({ form, menuData, fieldName, fieldLabel }) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const _open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledModelField>
      <TextField name={fieldName} label={t(fieldLabel)} required />
      <IconButton
        aria-label="more"
        id="button"
        className="select-button"
        aria-controls="long-menu"
        aria-expanded={_open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Icon>more_vert</Icon>
      </IconButton>
      <Menu id="customized-menu" anchorEl={anchorEl} open={_open} onClose={handleClose}>
        {menuData.map((privilage) => (
          <MenuItem
            key={privilage}
            onClick={() => {
              form.change(fieldName, privilage);
              handleClose();
            }}
          >
            {privilage}
          </MenuItem>
        ))}
      </Menu>
    </StyledModelField>
  );
};
