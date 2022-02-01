import React, { FC, useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import { ElementWithDnd, Element } from "../..";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { StyledFilePond } from "./file-upload-element.styled";
import { axiosCancelTokenSource, axiosIsCancel, defaultRequest } from "helpers";

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

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateSize,
  FilePondPluginFileValidateType,
  FilePondPluginImageCrop
);

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
        allowReorder
        maxFiles={3}
        server={{
          process: (fieldName, file, metadata, load, error, progress, abort) => {
            const formData = new FormData();
            formData.append("image", file);

            defaultRequest
              .post("/api/jwt/uploadFile", formData, {
                cancelToken: axiosCancelTokenSource.token,
                onUploadProgress: (e: ProgressEvent) => {
                  progress(e.lengthComputable, e.loaded, e.total);
                },
              })
              .then(({ status, data }) => {
                if (status >= 200 && status < 300 && data.code === "OK") {
                  load(data.data);
                } else {
                  error(data.message);
                }
              })
              .catch((e) => {
                if (axiosIsCancel(e)) {
                  console.log("Request canceled", e.message);
                }
                error(e); // handle error
              });

            return {
              abort: () => {
                axiosCancelTokenSource.cancel("Operation canceled by the user.");
                abort();
              },
            };
          },
          revert: (uniqueFileId, load, error) => {
            defaultRequest
              .post(`/api/jwt/file/${uniqueFileId}/remove`)
              .then(({ data }) => {
                if (data.code === "OK") {
                  load();
                } else {
                  error(data.message);
                }
              })
              .catch((e) => error(e));
          },
          load: `${process.env.REACT_APP_API_BASE_URL}/DispatcherRest/api/get/file/`,
        }}
        name="files"
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
    </StyledFilePond>
  );

  return withDnd ? (
    <ElementWithDnd {...rest} type="fileUpload">
      {fileComp}
    </ElementWithDnd>
  ) : (
    <Element top={rest.top} left={rest.left} width={rest.width}>
      {fileComp}
    </Element>
  );
};
