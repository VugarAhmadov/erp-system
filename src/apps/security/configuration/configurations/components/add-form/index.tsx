import React, { useEffect, useState } from "react";
import { Button, Icon, IconButton, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { StyledAddForm } from "./add-form.styled";
import { Input } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "store";
import { getHtmlFormOrViewname } from "apps/security/operation/store/actions";
import { operationApi } from "api";

export const AddForm = () => {
  const { t, i18n } = useTranslation("common");
  const dispatch = useDispatch();
  const [dialogOpened, setDialogOpened] = useState(false);

  const selectedOperation = useSelector((state: AppState) => state.configurations.selectedOperation);

  const [elements, setElements] = useState<any[]>([]);

  useEffect(() => {
    operationApi.getHtmlFormOrViewname({ lang: i18n.language, operationId: selectedOperation }).then(({ data }) => {
      if (data.err.length === 0) {
        setElements(JSON.parse(data.tbl[0].r[0].operationHtml));
      }
    });
  }, [selectedOperation]);

  const handleAddInputSubmit = (data: any) => {
    setElements((elementsState) => [
      ...elementsState,
      {
        element: "input",
        index: elements.length,
        params: data,
      },
    ]);
  };
  // console.log(elements);
  return (
    <>
      <StyledAddForm>
        <Typography variant="h5">{t("addForm")}</Typography>
        <div className="component-buttons">
          <Button onClick={() => setDialogOpened(true)}>{t("input")}</Button>
          <Button onClick={() => console.log("test")}>{t("select")}</Button>
          <Button onClick={() => console.log("test")}>{t("checkbox")}</Button>
          <Button onClick={() => console.log("test")}>{t("label")}</Button>
          <Button onClick={() => console.log("test")}>{t("tab")}</Button>
          <Button onClick={() => console.log("test")}>{t("button")}</Button>
        </div>
        <div className="drag-container">
          {elements.map((element) => (
            <div key={element.index}>
              {element.element === "input" && (
                <div className="input-container">
                  <TextField
                    type={element.params.type}
                    name={element.params.name}
                    label={t(element.params.label)}
                    placeholder={element.params?.placeholder}
                    size="medium"
                  />
                  <div className="action-buttons">
                    <IconButton size="small">
                      <Icon>edit</Icon>
                    </IconButton>
                    <IconButton>
                      <Icon>delete</Icon>
                    </IconButton>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </StyledAddForm>
      <Input open={dialogOpened} onClose={() => setDialogOpened(false)} onSubmit={handleAddInputSubmit} />
    </>
  );
};
