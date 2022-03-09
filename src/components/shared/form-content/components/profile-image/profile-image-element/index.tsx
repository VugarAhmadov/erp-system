import React, { FC, useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import { ElementWithDnd, Element } from "../../..";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { StyledFilePond } from "./profile-image-element.styled";
import { axiosCancelTokenSource, axiosIsCancel, defaultRequest } from "helpers";
import { ProfileImage } from "components/shared";

export interface IProfileImageParams {
  table?: string;
  views?: string;
  model?: string;
  width?: number;
}

interface IProfileImageElement {
  withDnd?: boolean;
  params: IProfileImageParams;
  id: string;
  onEdit?(type: string, id: string): void;
  onDelete?(id: string): void;
}

export const ProfileImageElement: FC<IProfileImageElement> = ({ withDnd, params, ...rest }) => {
  const { model } = params;

  const profileImageComp = <ProfileImage name={model || `model-${rest.id}`} width={params.width} />;

  return withDnd ? (
    <ElementWithDnd {...rest} type="profileImage" params={params}>
      {profileImageComp}
    </ElementWithDnd>
  ) : (
    <Element>{profileImageComp}</Element>
  );
};
