import React, { FC, memo, useState } from "react";
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
  Typography,
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

export const DialogConfig: FC<IDialogConfig> = memo(
  ({ dialogSize, gridView, onDialogSizeChange, onGridViewChange }) => {
    const { t } = useTranslation("common");

    const [columnSize, setColumnSize] = useState("6");

    const [, dragGridRow] = useDrag(() => ({ type: Components.GRID, item: {} }));

    const [, dragGridColumn] = useDrag(() => ({ type: Components.COLUMN, item: { columnSize } }), [columnSize]);

    const [, dragInput] = useDrag(() => ({
      type: Components.ELEMENT,
      item: { type: "input", params: {}, move: false },
    }));

    const [, dragButton] = useDrag(() => ({
      type: Components.ELEMENT,
      item: { type: "button", params: {}, move: false },
    }));

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
        <div className="layout-components">
          <Typography variant="subtitle1" className="heading">
            {t("layoutComponents")}
          </Typography>
          <List component="nav">
            <ListItemButton ref={dragGridRow}>
              <ListItemIcon>
                <Icon>inbox</Icon>
              </ListItemIcon>
              <ListItemText primary={t("grid")} />
            </ListItemButton>
            <ListItemButton ref={dragGridColumn}>
              <ListItemIcon>
                <Icon>inbox</Icon>
              </ListItemIcon>
              <ListItemText primary={t("column")} />
              <FormControl className="column-size">
                <Select value={columnSize} onChange={(e: SelectChangeEvent) => setColumnSize(e.target.value)}>
                  {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"].map((size) => (
                    <MenuItem value={size}>{size}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </ListItemButton>
          </List>
        </div>
        <div className="components layout-components">
          <Typography variant="subtitle1" className="heading">
            {t("Components")}
          </Typography>
          <List component="nav">
            <ListItemButton ref={dragInput}>
              <ListItemIcon>
                <Icon>inbox</Icon>
              </ListItemIcon>
              <ListItemText primary={t("input")} />
            </ListItemButton>
            <ListItemButton ref={dragButton}>
              <ListItemIcon>
                <Icon>inbox</Icon>
              </ListItemIcon>
              <ListItemText primary={t("button")} />
            </ListItemButton>
          </List>
        </div>
      </StyledDialogConfig>
    );
  }
);
