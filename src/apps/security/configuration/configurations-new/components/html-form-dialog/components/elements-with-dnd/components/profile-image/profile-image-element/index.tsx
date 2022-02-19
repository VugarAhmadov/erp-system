import React, { FC, useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import { ElementWithDnd, Element } from "../..";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { StyledFilePond } from "./profile-image-element.styled";
import { axiosCancelTokenSource, axiosIsCancel, defaultRequest } from "helpers";

export interface IProfileImageParams {
  table?: string;
  views?: string;
  label?: string;
}

interface IProfileImageElement {
  withDnd?: boolean;
  params: IProfileImageParams;
  id: number;
  onEdit?(type: string, id: number): void;
  onDelete?(id: number): void;
}

export const ProfileImageElement: FC<IProfileImageElement> = ({ withDnd, params, ...rest }) => {
  // const { label, variant, multiple } = params;

  const fileComp = <div></div>;

  return withDnd ? (
    <ElementWithDnd {...rest} type="profileImage" params={params}>
      {fileComp}
    </ElementWithDnd>
  ) : (
    <Element>{fileComp}</Element>
  );
};
