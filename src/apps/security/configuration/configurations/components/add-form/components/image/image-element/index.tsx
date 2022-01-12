import React, { FC, useEffect, useState } from "react";
import { Img } from "react-image";
import { ElementWithDnd, Element } from "../..";

interface IImageElement {
  withDnd?: boolean;
  src: string;
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
  const [dependedSrc, setDependedSrc] = useState("");

  useEffect(() => {
    if (dependedModelName && dependedModelField) {
      // setDependedSrc(`http://173.212.212.209:8182/api/get/file/${dependedFieldValue}`);
    }
  }, [dependedFieldData]);

  console.log(dependedSrc);

  const image = (
    <Img
      src={dependedModelName && dependedModelField && dependedFieldData ? dependedSrc : src}
      alt={alt}
      width="100%"
      height="100%"
    />
  );

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
