import React, { FC, memo } from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { generate } from "short-uuid";
import clsx from "clsx";
import { addItem } from "apps/security/configuration/configurations/store";
import { StyledContentWithDnd } from "./content-with-dnd.styled";
import { Components, GridRowWithDnd } from "../..";
import { IRow } from "../../types";

interface IContentWithDnd {
  content: any;
  className?: string;
  type?: "main" | "tab";
  id?: string;
}

export const ContentWithDnd: FC<IContentWithDnd> = memo(({ content, className, id, type }) => {
  const dispatch = useDispatch();

  const [, dropRow] = useDrop(
    () => ({
      accept: Components.ROW,
      drop(item: any, monitor) {
        const didDrop = monitor.didDrop();

        if (didDrop) return;

        dispatch(
          addItem({
            id: generate(),
            parentId: id ?? null,
            ...item,
          })
        );

        return undefined;
      },
    }),
    [content]
  );

  const _content = content.map((row: IRow) => <GridRowWithDnd row={row} key={row.id} />);

  return type ? (
    <StyledContentWithDnd ref={dropRow} className={clsx(className)} type={type}>
      {_content}
    </StyledContentWithDnd>
  ) : (
    <>{_content}</>
  );
});
