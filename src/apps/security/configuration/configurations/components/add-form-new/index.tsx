import React, { FC, useCallback, useState } from "react";
import { Button, Grid, Icon, IconButton, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { StyledAddForm } from "./add-form.styled";
import { Components } from "../dialog-config/constants";
import { useDrop } from "react-dnd";
import { ButtonDialog, GridRow } from "./components";
import { Form } from "react-final-form";
import { IDialogState } from "./types";
import { useSelector } from "react-redux";
import { AppState } from "store";

interface IAddForm {
  onClose(): void;
  gridView: "on" | "off";
}

interface IElement {
  type: "input" | "radio";
  move: boolean;
  rowIndex: number;
  columnIndex: number;
  params: any;
}

export const AddFormNew: FC<IAddForm> = ({ onClose, gridView }) => {
  const { t } = useTranslation("common");
  const [content, setContent] = useState<any[]>([]);

  const selectedOperation = useSelector((state: AppState) => state.configurations.selectedOperation);

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

  const handleDialogOpen = (type: string, rowIndex: number, columnIndex: number) => {
    const params = content[rowIndex].columns[columnIndex].element.params || null;
    setDialog((state) => ({
      open: { ...state.open, [type]: true },
      data: { type, rowIndex, columnIndex, params, operationId: selectedOperation.id },
    }));
  };

  const handleDialogClose = useCallback((type: string) => {
    setDialog((state) => ({ open: { ...state.open, [type]: false }, data: null }));
  }, []);

  const handleDialogSubmit = (data: any) => {
    let contentCopy = [...content];

    contentCopy[dialog!.data!.rowIndex].columns[dialog!.data!.columnIndex].element.params = data;

    setContent(contentCopy);
    handleDialogClose(dialog.data?.type!);
  };

  const addContent = useCallback(
    (index) => {
      setContent((prev) => [...prev, { index, type: "grid-row", columns: [] }]);
    },
    [content]
  );
  const [{ isOver, canDrop }, dropContainer] = useDrop(
    () => ({
      accept: Components.GRID,
      drop(item: any, monitor) {
        addContent(content.length);
        return undefined;
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
      }),
    }),
    [addContent]
    // [greedy, setHasDropped, setHasDroppedOnChild]
  );

  const handleGridRowDelete = (index: number) => {
    let contentCopy = [...content];
    contentCopy?.splice(index, 1);
    contentCopy?.forEach((el, i) => {
      el.index = i;
    });
    setContent(contentCopy);
  };

  const handleGridColumnDelete = (rowIndex: number, columnIndex: number) => {
    let contentCopy = [...content];
    contentCopy[rowIndex].columns.splice(columnIndex, 1);
    contentCopy[rowIndex].columns.forEach((c: any, i: number) => {
      c.index = i;
    });
    setContent(contentCopy);
  };

  const handleColumnAdd = useCallback(
    (gridIndex: number) => {
      let contentCopy = [...content];
      contentCopy[gridIndex].columns?.push({ index: contentCopy[gridIndex].columns.length, type: "grid-column" });
      setContent(contentCopy);
    },
    [content]
  );

  const handleComponentAdd = (rowIndex: number, columnIndex: number, element: IElement) => {
    let contentCopy = [...content];
    if (element.move) {
      contentCopy[element.rowIndex].columns[element.columnIndex].element = {};
    }
    console.log(element);
    contentCopy[rowIndex].columns[columnIndex].element = { ...element, rowIndex, columnIndex };
    setContent(contentCopy);
  };

  const handleElementDelete = (rowIndex: number, columnIndex: number) => {
    let contentCopy = [...content];
    contentCopy[rowIndex].columns[columnIndex].element = {};
    setContent(contentCopy);
  };

  return (
    <>
      <StyledAddForm>
        <div className="form-header">
          <Typography variant="h5">{t("addForm")}</Typography>
          <div className="action-buttons">
            <Button className="submit-btn">{t("submit")}</Button>
            <Button onClick={onClose} variant="outlined">
              {t("close")}
            </Button>
          </div>
        </div>
        <div ref={dropContainer} className={clsx("form-body", gridView === "on" && "grid-view")}>
          <Form
            onSubmit={() => {}}
            render={({ handleSubmit, values }) => (
              <form onSubmit={handleSubmit}>
                {content.map((row) => (
                  <GridRow
                    grid={row}
                    key={row.index}
                    onColumnAdd={handleColumnAdd}
                    onComponentAdd={handleComponentAdd}
                    onGridRowDelete={handleGridRowDelete}
                    onGridColumnDelete={handleGridColumnDelete}
                    onElementDelete={handleElementDelete}
                    onElementEdit={handleDialogOpen}
                  />
                ))}
              </form>
            )}
          />
        </div>
      </StyledAddForm>
      <ButtonDialog
        open={dialog.open.button}
        onClose={() => handleDialogClose("button")}
        onSubmit={handleDialogSubmit}
        params={dialog.data?.params}
      />
      {/* <InputDialog
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
      /> */}
    </>
  );
};
