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
import { addGridRow } from "apps/security/configuration/configurations-new/store";
import { GridRow } from "..";

interface IDialogContent {
  onSubmit(): void;
  onClose(): void;
  gridView: string;
}

export const DialogContent: FC<IDialogContent> = ({ onSubmit, onClose, gridView }) => {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();

  const selectedOperation = useSelector((state: AppState) => state.configurationsNew.selectedOperationHtmlForm);

  const [, dropRow] = useDrop(
    () => ({
      accept: Components.GRID,
      drop(item: any, monitor) {
        dispatch(addGridRow());
        return undefined;
      },
    }),
    []
  );
  console.log(selectedOperation.formContent);
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
              {selectedOperation.formContent?.map((row) => (
                <GridRow gridRow={row} key={row.index} />
              ))}
            </form>
          )}
        />
      </div>
    </StyledDialogContent>
  );
};
