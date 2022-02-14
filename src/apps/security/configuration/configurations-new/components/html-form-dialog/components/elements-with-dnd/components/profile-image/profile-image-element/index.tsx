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

  const [files, setFiles] = useState([]);

  const fileComp = (
    <StyledFilePond>
      {/* <FilePond
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
      /> */}
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
