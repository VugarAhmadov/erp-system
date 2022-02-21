import React, { FC } from "react";
import { FilePond } from "components/shared";
import { ElementWithDnd, Element } from "../..";
import { StyledFilePond } from "./file-upload-element.styled";

export interface IFileUploadParams {
  table?: string;
  views?: string;
  model?: string;
  variant?: "file" | "image";
  multiple?: string;
  label?: string;
}

interface IFileUploadElement {
  withDnd?: boolean;
  params: IFileUploadParams;
  id: number;
  onEdit?(type: string, id: number): void;
  onDelete?(id: number): void;
}

export const FileUploadElement: FC<IFileUploadElement> = ({ withDnd, params, ...rest }) => {
  const { label, variant, model, multiple } = params;

  const fileComp = (
    <StyledFilePond>
      <FilePond name={model || `model-${rest.id}`} allowMultiple={!!multiple} maxFiles={3} />
    </StyledFilePond>
  );

  return withDnd ? (
    <ElementWithDnd {...rest} type="fileUpload" params={params}>
      {fileComp}
    </ElementWithDnd>
  ) : (
    <Element>{fileComp}</Element>
  );
};
