import React, { FC } from "react";
import {
  Breakpoint,
  FormControl,
  Icon,
  InputLabel,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { StyledDialogConfig } from "./dialog-config.styled";
import { useDrag } from "react-dnd";
import { Components } from "./constants";

interface IDialogConfig {
  dialogSize: Breakpoint;
  gridView: string;
  onDialogSizeChange(size: Breakpoint): void;
  onGridViewChange(gridView: string): void;
}

export const DialogConfig: FC<IDialogConfig> = ({ dialogSize, gridView, onDialogSizeChange, onGridViewChange }) => {
  const { t } = useTranslation("common");
  const [, drag] = useDrag(() => ({ type: Components.GRID, item: {} }));

  return (
    <StyledDialogConfig>
      <div className="controls">
        <FormControl className="dialog-size">
          <InputLabel id="dialog-size-select-label">{t("dialogSize")}</InputLabel>
          <Select
            labelId="dialog-size-select-label"
            id="dialog-size-select"
            value={dialogSize}
            label={t("dialogSize")}
            onChange={(e: SelectChangeEvent) => onDialogSizeChange(e.target.value as Breakpoint)}
          >
            <MenuItem value="xs">Extra small</MenuItem>
            <MenuItem value="sm">Small</MenuItem>
            <MenuItem value="md">Medium</MenuItem>
            <MenuItem value="lg">Large</MenuItem>
            <MenuItem value="xl">Extra Large</MenuItem>
          </Select>
        </FormControl>
        <FormControl className="grid-view">
          <InputLabel id="grid-view-select-label">{t("gridView")}</InputLabel>
          <Select
            labelId="grid-view-select-label"
            id="grid-view-select"
            value={gridView}
            label={t("gridView")}
            onChange={(e: SelectChangeEvent) => onGridViewChange(e.target.value)}
          >
            <MenuItem value="on">On</MenuItem>
            <MenuItem value="off">Off</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="components">
        <List component="nav" aria-label="main mailbox folders">
          <ListItemButton ref={drag}>
            <ListItemIcon>
              <Icon>inbox</Icon>
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItemButton>
        </List>
      </div>
    </StyledDialogConfig>
  );
};
