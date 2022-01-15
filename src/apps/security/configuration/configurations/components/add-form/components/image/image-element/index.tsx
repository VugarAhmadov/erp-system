import React, { FC, useEffect, useState } from "react";
import { Img } from "react-image";
import { ElementWithDnd, Element } from "../..";

interface IImageElement {
  withDnd?: boolean;
  src?: string;
  alt?: string;
  dependedModelName?: string;
  dependedModelField?: string;
  dependedFieldData?: any;
  top: number;
  left: number;
  width?: string;
  height?: string;
  index: number;
  handleEdit?(type: string, index: number): void;
  handleDelete?(index: number): void;
}

export const ImageElement: FC<IImageElement> = ({
  withDnd,
  src,
  alt,
  dependedModelName,
  dependedModelField,
  dependedFieldData,
  ...rest
}) => {
  const dependedSrc =
    dependedModelField &&
    dependedFieldData &&
    `http://173.212.212.209:8182/DispatcherRest/api/get/file/${dependedFieldData[dependedModelField]}`;

  const image = <Img src={[src ?? dependedSrc, "/images/admin-avatar.svg"]} alt={alt} width="100%" height="100%" />;

  return withDnd ? (
    <ElementWithDnd {...rest} type="image">
      {image}
    </ElementWithDnd>
  ) : (
    <Element top={rest.top} left={rest.left} width={rest.width} height={rest.height}>
      {image}
    </Element>
  );
};
