import React, { FC } from "react";
import { Button, Grid, Icon } from "@mui/material";
import { StyledPaper } from "./filter-bar.styled";
import { IFilterBar } from "./type";
import { SectionHeader } from "..";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const FilterBar: FC<IFilterBar> = ({ addButton, title }) => {
  const { t } = useTranslation("common");
  const navigate = useNavigate();

  // const initialConfig: IFilterBarConfig = {
  //   addButton: {
  //     show: true,
  //     ...addButton
  //   },
  //   ...config,
  // };

  return (
    <StyledPaper variant="outlined">
      <div>
        <SectionHeader title={title || ""} />

        <div className="action-buttons">
          <Button
            color="primary"
            variant="outlined"
            className="back-button"
            size="small"
            startIcon={<Icon>chevron_left</Icon>}
            onClick={() => navigate(-1)}
          >
            {t("back")}
          </Button>
          {addButton.show && (
            <Button
              // component={RouterLink}
              // to={addButton.link!}
              startIcon={<Icon>{addButton.icon ?? "add"}</Icon>}
              size="small"
              variant="contained"
              color="success"
              onClick={addButton.onClick}
            >
              {addButton.title}
            </Button>
          )}
        </div>
      </div>
      <div className="right-side"></div>
    </StyledPaper>
  );
};
