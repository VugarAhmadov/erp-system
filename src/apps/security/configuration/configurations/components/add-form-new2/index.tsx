import { Button, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyledAddForm } from "./add-form.styled";

export const AddFormNew2 = () => {
  const { t } = useTranslation("common");

  return (
    <>
      <StyledAddForm>
        {/* <div className="form-header">
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
        </div> */}
      </StyledAddForm>
    </>
  );
};
