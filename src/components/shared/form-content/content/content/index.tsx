import React, { FC } from "react";
import { GridRow } from "../..";
import { IRow } from "../../types";

interface IContent {
  content: IRow[];
}

export const Content: FC<IContent> = ({ content }) => {
  return (
    <>
      {content?.map((row: IRow) => (
        <GridRow row={row} key={row.id} />
      ))}
    </>
  );
};
