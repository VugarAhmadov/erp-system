import React, { FC, useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import { ElementWithDnd, Element } from "../..";
// import { FilePond } from "components/shared";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { StyledFilePond } from "./file-upload-element.styled";

interface IFileUploadElement {
  withDnd?: boolean;
  variant: "file" | "image";
  multiple: string;
  label: string;
  top: number;
  left: number;
  width?: string;
  index: number;
  onEdit?(type: string, index: number): void;
  onDelete?(index: number): void;
}

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export const FileUploadElement: FC<IFileUploadElement> = ({ withDnd, label, variant, multiple, ...rest }) => {
  const [files, setFiles] = useState([]);

  const fileComp = (
    <StyledFilePond>
      <FilePond
        files={files}
        className="filepond"
        //@ts-ignore
        onupdatefiles={setFiles}
        allowMultiple={!!multiple}
        maxFiles={3}
        server="/api"
        name="files"
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
    </StyledFilePond>
  );

  return withDnd ? (
    <ElementWithDnd {...rest} type="label">
      {fileComp}
    </ElementWithDnd>
  ) : (
    <Element top={rest.top} left={rest.left} width={rest.width}>
      {fileComp}
    </Element>
  );
};
