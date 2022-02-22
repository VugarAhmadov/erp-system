import React, { FC } from "react";
import { Typography } from "@mui/material";
import { useDrop } from "react-dnd";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "components/shared";
import { Components, MainContent } from "components/shared/form-content";
import { StyledDialogContent } from "./dialog-content.styled";
import { AppState } from "store";
import { addItem } from "apps/security/configuration/configurations/store";
import { GridRow } from "..";
import { createTree } from "helpers";
import { IRow } from "../types";
import { generate } from "short-uuid";

interface IDialogContent {
  onSubmit(): void;
  onClose(): void;
  gridView: string;
}

export const DialogContent: FC<IDialogContent> = ({ onSubmit, onClose, gridView }) => {
  const { t } = useTranslation("common");

  const selectedOperation = useSelector((state: AppState) => state.configurations.selectedOperationHtmlForm);

  const formContent = useSelector((state: AppState) => state.configurations.selectedOperationHtmlForm.formContent);

  const _content = formContent ? createTree(formContent) : [];

  return (
    <StyledDialogContent>
      <div className="form-header">
        <Typography variant="h5">{t("addForm")}</Typography>
        <div className="action-buttons">
          <Button onClick={onSubmit} className="submit-btn">
            {t("submit")}
          </Button>
          <Button onClick={onClose} variant="outlined">
            {t("close")}
          </Button>
        </div>
      </div>
      <MainContent className={gridView === "on" ? "grid-view" : ""}>
        <Form
          onSubmit={() => {}}
          subscription={{ submitting: true }}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              {_content.map((row: IRow) => (
                <GridRow row={row} key={row.id} />
              ))}
            </form>
          )}
        />
      </MainContent>
    </StyledDialogContent>
  );
};
