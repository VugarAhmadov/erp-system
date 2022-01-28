import React, { FC, useCallback, useState } from "react";
import { Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { StyledAddForm } from "./add-form.styled";
import { Components } from "../dialog-config/constants";
import { useDrop } from "react-dnd";

interface IAddForm {
  onClose(): void;
  gridView: "on" | "off";
}

export const AddFormNew: FC<IAddForm> = ({ onClose, gridView }) => {
  const { t } = useTranslation("common");
  const [hasDropped, setHasDropped] = useState(false);
  const [content, setContent] = useState<any[]>([]);

  const addContent = useCallback(
    (index) => {
      let newState = [...content];
      newState[index].type = "grid";
      setContent(newState);
    },
    [content]
  );

  const [{ isOver, isOverCurrent }, drop] = useDrop(
    () => ({
      accept: Components.GRID,
      drop(item: any, monitor) {
        addContent(1);
        return undefined;
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
      }),
    }),
    [addContent]
    // [greedy, setHasDropped, setHasDroppedOnChild]
  );

  const getContent = () => {
    {
      content.map((c) => c.type === "grid-row");
    }

    return <></>;
  };

  return (
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
      <div ref={drop} className={clsx("form-body", gridView === "on" && "grid-view")}>
        {getContent()}
      </div>
    </StyledAddForm>
  );
};
