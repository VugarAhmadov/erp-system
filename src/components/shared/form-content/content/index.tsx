import React, { FC, memo } from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { generate } from "short-uuid";
import clsx from "clsx";
import { addItem } from "apps/security/configuration/configurations/store";
import { StyledMainContent } from "./content.styled";
import { Components } from "..";
import { IRow } from "../types";
import { GridRowElementWithDnd } from "../grid-row";

interface IContent {
  content: any[];
  className?: string;
  type?: "main" | "tab";
  id?: string;
}

export const Content: FC<IContent> = memo(({ content, className, id, type }) => {
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
            parentId: id ?? null,
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
    []
  );

  const _content = content.map((row: IRow) => <GridRowElementWithDnd row={row} key={row.id} />);

  return type ? (
    <StyledMainContent ref={dropRow} className={clsx(className)} type={type}>
      {_content}
    </StyledMainContent>
  ) : (
    <>{_content}</>
  );
});
