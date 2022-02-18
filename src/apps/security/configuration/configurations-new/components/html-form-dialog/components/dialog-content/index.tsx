import React, { FC } from "react";
import { Typography } from "@mui/material";
import { useDrop } from "react-dnd";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "components/shared";
import { Components } from "../dialog-config/constants";
import { StyledDialogContent } from "./dialog-content.styled";
import { AppState } from "store";
import { addItem } from "apps/security/configuration/configurations-new/store";
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
  const dispatch = useDispatch();

  const selectedOperation = useSelector((state: AppState) => state.configurationsNew.selectedOperationHtmlForm);

  const formContent = useSelector((state: AppState) => state.configurationsNew.selectedOperationHtmlForm.formContent);

  console.log(JSON.stringify(formContent, null, 4));

  const _content = formContent ? createTree(formContent) : [];

  const [, dropRow] = useDrop(
    () => ({
      accept: Components.GRID,
      drop(item: any, monitor) {
        const didDrop = monitor.didDrop();

        if (didDrop) return;

        dispatch(
          addItem({
            id: generate(),
            parentId: null,
            type: "row",
          })
        );

        return undefined;
      },
    }),
    [_content]
  );

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
      <div ref={dropRow} className={clsx("form-body", gridView === "on" && "grid-view")}>
        <Form
          onSubmit={() => {}}
          render={({ handleSubmit, values }) => (
            <form onSubmit={handleSubmit}>
              {_content.map((row: IRow) => (
                <GridRow row={row} key={row.id} />
              ))}
            </form>
          )}
        />
      </div>
    </StyledDialogContent>
  );
};
