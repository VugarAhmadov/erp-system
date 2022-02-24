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
  content: any[];
  className?: string;
  isMain?: boolean;
}

export const MainContent: FC<IMainContent> = ({ content, className, isMain = false }) => {
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

  const _content = content.map((row: IRow) => <GridRowElementWithDnd row={row} key={row.id} />);

  return isMain ? (
    <StyledMainContent ref={dropRow} className={clsx(className)}>
      {_content}
    </StyledMainContent>
  ) : (
    <>{_content}</>
  );
};
