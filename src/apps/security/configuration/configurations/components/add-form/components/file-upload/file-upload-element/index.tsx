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
        server={{
          process: (fieldName, file, metadata, load, error, progress, abort) => {
            const formData = new FormData();
            formData.append("image", file);

            const request = new XMLHttpRequest();
            request.open("POST", `${process.env.REACT_APP_API_BASE_URL}/DispatcherRest/api/jwt/uploadFile`);
            request.setRequestHeader("Auth", `Codium ${localStorage.getItem("codeum_jwt_token")}`);

            request.upload.onprogress = (e) => {
              progress(e.lengthComputable, e.loaded, e.total);
            };

            request.onload = function () {
              if (request.status >= 200 && request.status < 300) {
                load(JSON.parse(request.response).data);
              } else {
                error("oh no");
              }
            };

            request.send(formData);

            return {
              abort: () => {
                request.abort();
                abort();
              },
            };
          },
          fetch: (url, load, error, progress, abort, headers) => {
            // Should get a file object from the URL here
            // ...

            // Can call the error method if something is wrong, should exit after
            error("oh my goodness");

            // Can call the header method to supply FilePond with early response header string
            // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/getAllResponseHeaders
            // headers(headersString);

            // Should call the progress method to update the progress to 100% before calling load
            // (computable, loadedSize, totalSize)
            progress(true, 0, 1024);

            // Should call the load method with a file object when done
            // load(file);

            // Should expose an abort method so the request can be cancelled
            return {
              abort: () => {
                // User tapped abort, cancel our ongoing actions here

                // Let FilePond know the request has been cancelled
                abort();
              },
            };
          },
          load: `${process.env.REACT_APP_API_BASE_URL}/DispatcherRest/api/get/file/`,
          // process: {
          //   url: "/api/auth/uploadFile",
          //   headers: {
          //     "Auth": `Codium ${localStorage.getItem("codeum_jwt_token")}`,
          //   },
          // },
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
