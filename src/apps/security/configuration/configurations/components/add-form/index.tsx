import React, { FC, useCallback, useEffect, useState } from "react";
import {
  Breakpoint,
  Button,
  FormControl,
  Grid,
  Icon,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tooltip,
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
import {
  Elements,
  InputDialog,
  SelectDialog,
  CheckboxDialog,
  LabelDialog,
  DatepickerDialog,
  ButtonDialog,
  ImageDialog,
  TableDialog,
  TabDialog,
  RadioDialog,
} from "./components";
import { Form } from "react-final-form";

export const AddForm: FC<IAddForm> = ({ onClose, onSubmit, dialogSize, setDialogSize }) => {
  const { t, i18n } = useTranslation("common");

  const [selectData, setSelectData] = useState<any[]>([]);

  const [dialog, setDialog] = useState<IDialogState>({
    open: {
      input: false,
      select: false,
      checkbox: false,
      label: false,
      radio: false,
      datepicker: false,
      button: false,
      image: false,
      table: false,
      tab: false,
    },
    data: null,
  });
  const [formElements, setFormElements] = useState<any[]>([]);
  const [gridView, setGridView] = useState("off");
  const [gridRows, setGridRows] = useState<any[]>([]);
  const selectedOperation = useSelector((state: AppState) => state.configurations.selectedOperation);

  useEffect(() => {
    operationApi.getHtmlFormOrViewname({ lang: i18n.language, operationId: selectedOperation.id }).then(({ data }) => {
      if (data.err.length === 0) {
        const operHtml = JSON.parse(data.tbl[0].r[0].operationHtml);
        setFormElements(operHtml.formElements);
        setDialogSize(operHtml.dialogSize);
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

  const handleDialogClose = useCallback((type: string) => {
    setDialog((state) => ({ open: { ...state.open, [type]: false }, data: null }));
  }, []);

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
    setDialogSize(e.target.value as Breakpoint);
  };

  const handleGridChange = (e: SelectChangeEvent) => {
    setGridView(e.target.value as string);
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
        const delta = monitor.getDifferenceFromInitialOffset()!;
        let left = Math.round(parseInt(item.left) + delta.x);
        let top = Math.round(parseInt(item.top) + delta.y);
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

  const handleAddGridRow = () => {
    setGridRows((prev) => [...prev, { index: prev.length, items: [] }]);
  };

  return (
    <>
      <StyledAddForm>
        <div className="form-header">
          <Typography variant="h5">{t("addForm")}</Typography>
          <div className="action-buttons">
            <Button
              onClick={() =>
                onSubmit({
                  operationHtml: JSON.stringify({ formElements, dialogSize: dialogSize }),
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
              value={dialogSize}
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
              value={gridView}
              label={t("gridView")}
              onChange={handleGridChange}
            >
              <MenuItem value="on">On</MenuItem>
              <MenuItem value="off">Off</MenuItem>
            </Select>
          </FormControl>
          <Button sx={{ marginLeft: "1rem" }} size="small" onClick={handleAddGridRow}>
            Add Grid Row
          </Button>
        </div>
        <div className="component-buttons">
          <Button onClick={() => handleDialogOpen("input", -1)}>{t("input")}</Button>
          <Button onClick={() => handleDialogOpen("select", -1)}>{t("select")}</Button>
          <Button onClick={() => handleDialogOpen("checkbox", -1)}>{t("checkbox")}</Button>
          <Button onClick={() => handleDialogOpen("datepicker", -1)}>{t("datepicker")}</Button>
          <Button onClick={() => handleDialogOpen("label", -1)}>{t("label")}</Button>
          <Button onClick={() => handleDialogOpen("button", -1)}>{t("button")}</Button>
          <Button onClick={() => handleDialogOpen("image", -1)}>{t("image")}</Button>
          <Button onClick={() => handleDialogOpen("table", -1)}>{t("table")}</Button>
          <Button onClick={() => handleDialogOpen("tab", -1)}>{t("tab")}</Button>
          <Button onClick={() => handleDialogOpen("radio", -1)}>{t("radio")}</Button>
        </div>

        <div ref={drop} className={clsx("drag-container", gridView === "on" && "grid-view")}>
          <Form
            onSubmit={() => {}}
            render={({ handleSubmit, values }) => (
              <form onSubmit={handleSubmit}>
                {gridRows?.map((grid: any) => (
                  <Grid container sx={{ border: "1px dashed #000", minHeight: "120px", position: "relative" }}>
                    <div style={{ position: "absolute", top: "-1.25rem", left: "-1.25rem", zIndex: "2" }}>
                      <Tooltip title={t("addGridColumn")!}>
                        <IconButton color="info">
                          <Icon>add</Icon>
                        </IconButton>
                      </Tooltip>
                    </div>
                    {grid?.items?.map((item: any) => (
                      <Grid item xs={5} sx={{ border: "1px dashed #eee", minHeight: "100px" }}></Grid>
                    ))}
                  </Grid>
                ))}

                {/* {formElements?.map((element) => (
                  <Elements
                    element={element}
                    onEdit={handleDialogOpen}
                    onDelete={handleDeleteElement}
                    selectData={selectData}
                    onSelectChange={(data: any) =>
                      setSelectData((prev) => {
                        if (prev.find((p) => p.model === element.params.model)) {
                          return prev.map((n) => (n.model === element.params.model ? { ...n, data } : n));
                        } else {
                          return [...prev, { model: element.params.model, data }];
                        }
                      })
                    }
                  />
                ))} */}
              </form>
            )}
          />
        </div>
      </StyledAddForm>
      <InputDialog
        open={dialog.open.input}
        onClose={() => handleDialogClose("input")}
        onSubmit={handleSubmit}
        params={dialog.data?.params}
        dependableModelNames={formElements?.filter((e) => e.element === "select").map((e) => e.params.model)}
      />
      <SelectDialog
        open={dialog.open.select}
        onClose={() => handleDialogClose("select")}
        onSubmit={handleSubmit}
        params={dialog.data?.params}
      />
      <CheckboxDialog
        open={dialog.open.checkbox}
        onClose={() => handleDialogClose("checkbox")}
        onSubmit={handleSubmit}
        params={dialog.data?.params}
      />
      <DatepickerDialog
        open={dialog.open.datepicker}
        onClose={() => handleDialogClose("datepicker")}
        onSubmit={handleSubmit}
        params={dialog.data?.params}
      />
      <LabelDialog
        open={dialog.open.label}
        onClose={() => handleDialogClose("label")}
        onSubmit={handleSubmit}
        params={dialog.data?.params}
      />
      <ButtonDialog
        open={dialog.open.button}
        onClose={() => handleDialogClose("button")}
        onSubmit={handleSubmit}
        params={dialog.data?.params}
      />
      <ImageDialog
        open={dialog.open.image}
        onClose={() => handleDialogClose("image")}
        onSubmit={handleSubmit}
        params={dialog.data?.params}
      />
      <TableDialog
        open={dialog.open.table}
        onClose={() => handleDialogClose("table")}
        onSubmit={handleSubmit}
        params={dialog.data?.params}
      />
      <TabDialog
        open={dialog.open.tab}
        onClose={() => handleDialogClose("tab")}
        onSubmit={handleSubmit}
        params={dialog.data?.params}
      />
      <RadioDialog
        open={dialog.open.radio}
        onClose={() => handleDialogClose("radio")}
        onSubmit={handleSubmit}
        params={dialog.data?.params}
      />
    </>
  );
};
