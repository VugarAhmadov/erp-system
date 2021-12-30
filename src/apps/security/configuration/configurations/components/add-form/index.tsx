import React, { FC, useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { StyledAddForm } from "./add-form.styled";
import { AppState } from "store";
import { operationApi } from "api";
import { InputDialog, InputElement, SelectDialog, SelectElement } from "./components";

interface IAddForm {
  onClose(): void;
  onSubmit(data: any): void;
}

interface IDialogState {
  open: boolean;
  data: IDialogStateData | null;
}

interface IDialogStateData {
  type: string;
  index: number;
  params: any;
  operationId: string;
}

export const AddForm: FC<IAddForm> = ({ onClose, onSubmit }) => {
  const { t, i18n } = useTranslation("common");

  const [dialog, setDialog] = useState<IDialogState>({ open: false, data: null });
  const [formElements, setFormElements] = useState<any[]>([]);

  const selectedOperation = useSelector((state: AppState) => state.configurations.selectedOperation);

  useEffect(() => {
    operationApi.getHtmlFormOrViewname({ lang: i18n.language, operationId: selectedOperation.id }).then(({ data }) => {
      if (data.err.length === 0) {
        setFormElements(JSON.parse(data.tbl[0].r[0].operationHtml));
      }
    });
  }, [selectedOperation]);

  const handleDialogOpen = (type: string, index: number) => {
    const params = formElements.find((element) => element.index === index)?.params || null;
    setDialog({ open: true, data: { type, index, params, operationId: selectedOperation.id } });
  };

  const handleDialogClose = () => {
    setDialog({ open: false, data: null });
  };

  const handleDeleteElement = (index: number) => {
    let elementsCopy = [...formElements];
    elementsCopy.splice(index, 1);
    elementsCopy.forEach((el, i) => {
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
    handleDialogClose();
  };

  return (
    <>
      <StyledAddForm>
        <div className="form-header">
          <Typography variant="h5">{t("addForm")}</Typography>
          <div className="action-buttons">
            <Button
              onClick={() =>
                onSubmit({ operationHtml: JSON.stringify(formElements), operationId: selectedOperation.id })
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
        <div className="component-buttons">
          <Button onClick={() => handleDialogOpen("input", -1)}>{t("input")}</Button>
          <Button onClick={() => handleDialogOpen("select", -1)}>{t("select")}</Button>
          <Button onClick={() => console.log("test")}>{t("checkbox")}</Button>
          <Button onClick={() => console.log("test")}>{t("label")}</Button>
          <Button onClick={() => console.log("test")}>{t("tab")}</Button>
          <Button onClick={() => console.log("test")}>{t("button")}</Button>
        </div>
        <div className="drag-container">
          {formElements.map((element) => (
            <div key={element.index}>
              {element.element === "input" && (
                <InputElement
                  handleEdit={() => handleDialogOpen("input", element.index)}
                  handleDelete={() => handleDeleteElement(element.index)}
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
            </div>
          ))}
        </div>
      </StyledAddForm>
      {dialog?.data?.type === "input" && (
        <InputDialog
          open={dialog.open}
          onClose={handleDialogClose}
          onSubmit={handleSubmit}
          params={dialog.data?.params}
        />
      )}
      {dialog?.data?.type === "select" && (
        <SelectDialog
          open={dialog.open}
          onClose={handleDialogClose}
          onSubmit={handleSubmit}
          params={dialog.data?.params}
        />
      )}
    </>
  );
};
