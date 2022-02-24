import { Icon, IconButton, Menu, MenuItem } from "@mui/material";
import React, { FC, useState } from "react";
import { StyledIconButton, StyledMenu } from "./action-panel.styled";

interface IActionPanel {
  align?: "left" | "right";
  onEditClick?(): void;
  onDeleteClick(): void;
  onCopyClick?(): void;
}

export const ActionPanel: FC<IActionPanel> = ({ align = "right", onEditClick, onDeleteClick, onCopyClick }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <StyledIconButton onClick={handleClick} size="small" align={align}>
        <Icon fontSize="small">more_vert</Icon>
      </StyledIconButton>
      <StyledMenu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={onEditClick}>
          <Icon>edit</Icon> Edit
        </MenuItem>
        <MenuItem onClick={onDeleteClick}>
          <Icon>delete</Icon> Delete
        </MenuItem>
        <MenuItem onClick={onCopyClick}>
          <Icon>content_copy</Icon> Copy
        </MenuItem>
      </StyledMenu>
    </>
  );
};
