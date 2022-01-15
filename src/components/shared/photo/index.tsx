import React, { FC } from "react";
import { Spinner } from "..";
import { StyledImg } from "./photo.styled";

interface IPhoto {
  photoId?: string;
  loading?: boolean;
  placeholderImageName?: string;
  width?: string | number;
  height?: string | number;
  alt?: string;
}

export const Photo: FC<IPhoto> = ({ photoId, loading, placeholderImageName, width, height, alt }) => {
  const style = { width, height };

  return loading ? (
    <Spinner />
  ) : photoId && photoId !== "0" ? (
    <StyledImg
      src={`http://173.212.212.209:8182/DispatcherRest/api/get/file/${photoId}`}
      loader={<Spinner />}
      alt={alt}
      style={style}
    />
  ) : (
    <StyledImg src={`/images/${placeholderImageName}`} alt={alt} style={style} />
  );
};
