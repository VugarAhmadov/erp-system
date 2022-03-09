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
import { Components } from "components/shared/form-content";
import { generate } from "short-uuid";
import { useSelector } from "react-redux";
import { AppState } from "store";

interface IDialogConfig {
  dialogSize: Breakpoint;
  gridView: string;
  onDialogSizeChange(size: Breakpoint): void;
  onGridViewChange(gridView: string): void;
}

export const DialogConfig: FC<IDialogConfig> = memo(
  ({ dialogSize, gridView, onDialogSizeChange, onGridViewChange }) => {
    const { t } = useTranslation("common");
    const copiedItem = useSelector((state: AppState) => state.configurations.copiedItem);
    const [columnSize, setColumnSize] = useState("6");

    const [, dragGridRow] = useDrag(() => ({
      type: Components.GRID,
      item: {
        type: "row",
      },
    }));

    const [, dragGridColumn] = useDrag(
      () => ({ type: Components.COLUMN, item: { type: "column", params: { columnSize: Number(columnSize) } } }),
      [columnSize]
    );

    const [, dragInput] = useDrag(() => ({
      type: Components.ELEMENT,
      item: { type: "input", params: {}, move: false },
    }));

    const [, dragButton] = useDrag(() => ({
      type: Components.ELEMENT,
      item: { type: "button", params: {}, move: false },
    }));

    const [, dragDatepicker] = useDrag(() => ({
      type: Components.ELEMENT,
      item: { type: "datepicker", params: {}, move: false },
    }));

    const [, dragSelect] = useDrag(() => ({
      type: Components.ELEMENT,
      item: { type: "select", params: {}, move: false },
    }));

    const [, dragLabel] = useDrag(() => ({
      type: Components.ELEMENT,
      item: { type: "label", params: { label: "label", variant: "h6" }, move: false },
    }));

    const [, dragCheckbox] = useDrag(() => ({
      type: Components.ELEMENT,
      item: { type: "checkbox", params: {}, move: false },
    }));

    const [, dragRadio] = useDrag(() => ({
      type: Components.ELEMENT,
      item: { type: "radio", params: {}, move: false },
    }));

    const [, dragTable] = useDrag(() => ({
      type: Components.ELEMENT,
      item: { type: "table", params: {}, move: false },
    }));

    const [, dragFileUpload] = useDrag(() => ({
      type: Components.ELEMENT,
      item: { type: "fileUpload", params: {}, move: false },
    }));

    const [, dragTab] = useDrag(() => ({
      type: Components.ELEMENT,
      item: {
        type: "tab",
        params: {
          orientation: "horizontal",
          tabs: [{ id: generate(), label: "tab1" }],
        },
        move: false,
      },
    }));

    const [, dragImage] = useDrag(() => ({
      type: Components.ELEMENT,
      item: { type: "image", params: {}, move: false },
    }));

    const [, dragProfileImage] = useDrag(() => ({
      type: Components.ELEMENT,
      item: { type: "profileImage", params: {}, move: false },
    }));

    return (
      <StyledDialogConfig>
        <div className="controls">
          <FormControl className="dialog-size">
            <InputLabel id="dialog-size-select-label">{t("dialogSize")}</InputLabel>
            <Select
              labelId="dialog-size-select-label"
              id="dialog-size-select"
              value={dialogSize ?? "sm"}
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
        {copiedItem && (
          <div className="copied-item">
            <Typography variant="subtitle1" className="heading">
              {t("copyied")}
            </Typography>
          </div>
        )}
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
                    <MenuItem value={size} key={size}>
                      {size}
                    </MenuItem>
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
            <ListItemButton ref={dragDatepicker}>
              <ListItemIcon>
                <Icon>inbox</Icon>
              </ListItemIcon>
              <ListItemText primary={t("datepicker")} />
            </ListItemButton>
            <ListItemButton ref={dragSelect}>
              <ListItemIcon>
                <Icon>inbox</Icon>
              </ListItemIcon>
              <ListItemText primary={t("select")} />
            </ListItemButton>
            <ListItemButton ref={dragLabel}>
              <ListItemIcon>
                <Icon>inbox</Icon>
              </ListItemIcon>
              <ListItemText primary={t("label")} />
            </ListItemButton>
            <ListItemButton ref={dragCheckbox}>
              <ListItemIcon>
                <Icon>inbox</Icon>
              </ListItemIcon>
              <ListItemText primary={t("checkbox")} />
            </ListItemButton>
            <ListItemButton ref={dragRadio}>
              <ListItemIcon>
                <Icon>inbox</Icon>
              </ListItemIcon>
              <ListItemText primary={t("radio")} />
            </ListItemButton>
            <ListItemButton ref={dragButton}>
              <ListItemIcon>
                <Icon>inbox</Icon>
              </ListItemIcon>
              <ListItemText primary={t("button")} />
            </ListItemButton>
            <ListItemButton ref={dragTable}>
              <ListItemIcon>
                <Icon>inbox</Icon>
              </ListItemIcon>
              <ListItemText primary={t("table")} />
            </ListItemButton>
            <ListItemButton ref={dragFileUpload}>
              <ListItemIcon>
                <Icon>inbox</Icon>
              </ListItemIcon>
              <ListItemText primary={t("file-upload")} />
            </ListItemButton>
            <ListItemButton ref={dragProfileImage}>
              <ListItemIcon>
                <Icon>inbox</Icon>
              </ListItemIcon>
              <ListItemText primary={t("profile-image")} />
            </ListItemButton>
            <ListItemButton ref={dragTab}>
              <ListItemIcon>
                <Icon>inbox</Icon>
              </ListItemIcon>
              <ListItemText primary={t("tab")} />
            </ListItemButton>
            <ListItemButton ref={dragImage}>
              <ListItemIcon>
                <Icon>inbox</Icon>
              </ListItemIcon>
              <ListItemText primary={t("image")} />
            </ListItemButton>
          </List>
        </div>
      </StyledDialogConfig>
    );
  }
);
