import React, { FC } from "react";
import { Typography } from "@mui/material";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Button } from "components/shared";
import { Content } from "components/shared/form-content";
import { StyledDialogContent } from "./dialog-content.styled";
import { AppState } from "store";
import { createTree } from "helpers";

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
      <Form
        onSubmit={() => {}}
        subscription={{ submitting: true }}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Content content={_content} className={gridView === "on" ? "grid-view" : ""} type="main" />
          </form>
        )}
      />
    </StyledDialogContent>
  );
};
