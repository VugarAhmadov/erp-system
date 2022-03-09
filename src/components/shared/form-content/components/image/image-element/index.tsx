import React, { FC, useEffect, useState } from "react";
import { Img } from "react-image";
import { ElementWithDnd, Element } from "../../..";

export interface IImageParams {
  src?: string;
  alt?: string;
  width?: string;
  height?: string;
  dependedModelName?: string;
  dependedModelField?: string;
}

interface IImageElement {
  withDnd?: boolean;
  params: IImageParams;
  dependedFieldData?: any;
  id: string;
  onEdit?(type: string, id: string): void;
  onDelete?(id: string): void;
}

export const ImageElement: FC<IImageElement> = ({ withDnd, params, dependedFieldData, ...rest }) => {
  const { src, alt, dependedModelName, dependedModelField } = params;

  const dependedSrc =
    dependedModelField &&
    dependedFieldData &&
    `http://173.212.212.209:8182/DispatcherRest/api/get/file/${dependedFieldData[dependedModelField]}`;

  const image = <Img src={[src ?? dependedSrc, "/images/admin-avatar.svg"]} alt={alt} width="100%" height="100%" />;

  return withDnd ? (
    <ElementWithDnd {...rest} type="image" params={params}>
      {image}
    </ElementWithDnd>
  ) : (
    <Element>{image}</Element>
  );
};
