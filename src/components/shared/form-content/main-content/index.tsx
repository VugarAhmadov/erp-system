import React, { FC } from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { generate } from "short-uuid";
import clsx from "clsx";
import { addItem } from "apps/security/configuration/configurations/store";
import { StyledMainContent } from "./main-content.styled";
import { Components } from "..";
import { IRow } from "../types";
import { GridRowElementWithDnd } from "../grid-row";

interface IMainContent {
  className?: string;
  content: any[];
}

export const MainContent: FC<IMainContent> = ({ content, className }) => {
  const dispatch = useDispatch();

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
            params: {
              rowSpacing: 3,
              columnSpacing: 3,
              direction: "row",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            },
          })
        );

        return undefined;
      },
    }),
    [content]
  );

  return (
    <StyledMainContent ref={dropRow} className={clsx(className)}>
      {content.map((row: IRow) => (
        <GridRowElementWithDnd row={row} key={row.id} />
      ))}
    </StyledMainContent>
  );
};
