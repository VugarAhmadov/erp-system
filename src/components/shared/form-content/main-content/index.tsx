import React, { FC } from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { generate } from "short-uuid";
import clsx from "clsx";
import { addItem } from "apps/security/configuration/configurations/store";
import { StyledMainContent } from "./main-content.styled";
import { Components } from "..";

interface IMainContent {
  className?: string;
}

export const MainContent: FC<IMainContent> = ({ children, className }) => {
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
          })
        );

        return undefined;
      },
    }),
    []
  );

  return (
    <StyledMainContent ref={dropRow} className={clsx(className)}>
      {children}
    </StyledMainContent>
  );
};
