import React, { FC } from "react";
import { FieldValidator } from "final-form";
import { FilePond as FilePondRoot, FilePondProps, registerPlugin } from "react-filepond";
import { Field, FieldRenderProps } from "react-final-form";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { axiosCancelTokenSource, axiosIsCancel, defaultRequest, ShowErrorFunc, showErrorOnChange } from "helpers";
import { getValidator } from "helpers";
import { StyledFilePond } from "./file-pond.styled";

export interface IFilePond extends Partial<FilePondProps> {
  name: string;
  validate?: FieldValidator<any> | FieldValidator<any>[];
  showError?: ShowErrorFunc;
}

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateSize,
  FilePondPluginFileValidateType,
  FilePondPluginImageCrop
);

export const FilePond: FC<IFilePond> = ({ name, validate, ...rest }) => {
  return (
    <Field
      name={name}
      validate={getValidator(validate)}
      render={(fieldRenderProps) => <FilePondWrapper {...fieldRenderProps} name={name} {...rest} />}
    />
  );
};

interface FieldWrapper extends FieldRenderProps<any, HTMLElement> {
  label?: string;
}

const FilePondWrapper: FC<FieldWrapper> = ({
  input: { onChange, value },
  meta,
  label,
  showError = showErrorOnChange,
  ...rest
}) => {
  const { error, submitError } = meta;
  const isError = showError({ meta });
  const { t } = useTranslation("forms");

  console.log(value);

  return (
    <StyledFilePond>
      <FilePondRoot
        className={clsx("filepond", rest.clasaName)}
        // files={(file) => console.log(file)}
        files={value ? [{ source: value, options: { type: "limbo" } }] : undefined}
        allowReorder
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
                  // load(data.data);
                  onChange(data.data);
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
                  onChange("");
                } else {
                  error(data.message);
                }
              })
              .catch((e) => error(e));
          },
          restore: `${process.env.REACT_APP_API_BASE_URL}/DispatcherRest/api/get/file/`,
        }}
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        {...rest}
        // `${process.env.REACT_APP_API_BASE_URL}/DispatcherRest/api/get/file/${value}`
      />
      {isError && <small className="errorText">{error}</small>}
    </StyledFilePond>
  );
};
