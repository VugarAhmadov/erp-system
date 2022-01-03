import React, { FC, Fragment, useCallback, useEffect, useState } from "react";
import {
  Breakpoint,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import clsx from "clsx";
import { useDrop } from "react-dnd";
import { StyledAddForm } from "./add-form.styled";
import { AppState } from "store";
import { operationApi } from "api";
import { IAddForm, IDialogState } from "./types";
import { InputDialog, InputElement, SelectDialog, SelectElement } from "./components";

export const AddForm: FC<IAddForm> = ({ onClose, onSubmit, size, setSize }) => {
  const { t, i18n } = useTranslation("common");
  const [dialog, setDialog] = useState<IDialogState>({
    open: { input: false, select: false, checkbox: false, label: false },
    data: null,
  });
  const [formElements, setFormElements] = useState<any[]>([]);
  const [grid, setGrid] = useState("off");

  const selectedOperation = useSelector((state: AppState) => state.configurations.selectedOperation);

  useEffect(() => {
    operationApi.getHtmlFormOrViewname({ lang: i18n.language, operationId: selectedOperation.id }).then(({ data }) => {
      if (data.err.length === 0) {
        const operHtml = JSON.parse(data.tbl[0].r[0].operationHtml);
        setFormElements(operHtml.formElements);
        setSize(operHtml.dialogSize);
      }
    });
  }, [selectedOperation]);

  const handleDialogOpen = (type: string, index: number) => {
    const params = formElements.find((element) => element.index === index)?.params || null;
    setDialog((state) => ({
      open: { ...state.open, [type]: true },
      data: { type, index, params, operationId: selectedOperation.id },
    }));
  };

  const handleDialogClose = (type: string) => {
    setDialog((state) => ({ open: { ...state.open, [type]: false }, data: null }));
  };

  const handleDeleteElement = (index: number) => {
    let elementsCopy = [...formElements];
    elementsCopy?.splice(index, 1);
    elementsCopy?.forEach((el, i) => {
      el.index = i;
    });
    setFormElements(elementsCopy);
  };

  const handleSubmit = (data: any) => {
    let elementsCopy = [...formElements];
    if (dialog.data?.index !== -1) {
      elementsCopy[dialog.data?.index!].params = data;
    } else {
      elementsCopy.push({
        element: dialog.data?.type,
        index: elementsCopy.length,
        params: data,
      });
    }
    setFormElements(elementsCopy);
    handleDialogClose(dialog.data?.type!);
  };

  const handleSizeChange = (e: SelectChangeEvent) => {
    setSize(e.target.value as Breakpoint);
  };

  const handleGridChange = (e: SelectChangeEvent) => {
    setGrid(e.target.value as string);
  };

  const moveElement = useCallback(
    (index, left, top) => {
      let newState = [...formElements];
      newState[index].params.top = top;
      newState[index].params.left = left;
      setFormElements(newState);
    },
    [formElements]
  );

  const [, drop] = useDrop(
    () => ({
      accept: "box",
      drop(item: any, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset();
        let left = Math.round(item.left + delta?.x);
        let top = Math.round(item.top + delta?.y);
        // if (snapToGrid) {
        //     ;
        //     [left, top] = doSnapToGrid(left, top);
        // }
        moveElement(item.index, left, top);
        return undefined;
      },
    }),
    [moveElement]
  );

  return (
    <>
      <StyledAddForm>
        <div className="form-header">
          <Typography variant="h5">{t("addForm")}</Typography>
          <div className="action-buttons">
            <Button
              onClick={() =>
                onSubmit({
                  operationHtml: JSON.stringify({ formElements, dialogSize: size }),
                  operationId: selectedOperation.id,
                })
              }
              className="submit-btn"
            >
              {t("submit")}
            </Button>
            <Button onClick={onClose} variant="outlined">
              {t("close")}
            </Button>
          </div>
        </div>
        <div className="grid-control">
          <FormControl className="dialog-size">
            <InputLabel id="dialog-size-select-label">{t("dialogSize")}</InputLabel>
            <Select
              labelId="dialog-size-select-label"
              id="dialog-size-select"
              value={size}
              label={t("dialogSize")}
              onChange={handleSizeChange}
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
              value={grid}
              label={t("gridView")}
              onChange={handleGridChange}
            >
              <MenuItem value="on">On</MenuItem>
              <MenuItem value="off">Off</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="component-buttons">
          <Button onClick={() => handleDialogOpen("input", -1)}>{t("input")}</Button>
          <Button onClick={() => handleDialogOpen("select", -1)}>{t("select")}</Button>
          <Button onClick={() => console.log("test")}>{t("checkbox")}</Button>
          <Button onClick={() => console.log("test")}>{t("radioButton")}</Button>
          <Button onClick={() => console.log("test")}>{t("datepicker")}</Button>
          <Button onClick={() => console.log("test")}>{t("timepicker")}</Button>
          <Button onClick={() => console.log("test")}>{t("label")}</Button>
          <Button onClick={() => console.log("test")}>{t("photo")}</Button>
          <Button onClick={() => console.log("test")}>{t("file")}</Button>
          <Button onClick={() => console.log("test")}>{t("button")}</Button>
        </div>

        <div ref={drop} className={clsx("drag-container", grid === "on" && "grid-view")}>
          {formElements?.map((element) => (
            <Fragment key={element.index}>
              {element.element === "input" && (
                <InputElement
                  handleEdit={() => handleDialogOpen("input", element.index)}
                  handleDelete={() => handleDeleteElement(element.index)}
                  index={element.index}
                  {...element.params}
                />
              )}
              {/* {element.element === "select" && (
                <SelectElement
                  handleEdit={() => handleDialogOpen("select", element.index)}
                  handleDelete={() => handleDeleteElement(element.index)}
                  {...element.params}
                />
              )} */}
            </Fragment>
          ))}
        </div>
      </StyledAddForm>
      <InputDialog
        open={dialog.open.input}
        onClose={() => handleDialogClose("input")}
        onSubmit={handleSubmit}
        params={dialog.data?.params}
      />
      <SelectDialog
        open={dialog.open.select}
        onClose={() => handleDialogClose("select")}
        onSubmit={handleSubmit}
        params={dialog.data?.params}
      />
    </>
  );
};