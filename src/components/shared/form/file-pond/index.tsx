import clsx from "clsx";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";
import { FieldValidator } from "final-form";
// import { replace, useTranslator } from "localization";
import { ShowErrorFunc, showErrorOnChange } from "helpers";
import React, { FC } from "react";
import { FilePond as FilePondRoot, FilePondProps, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import { Field, FieldRenderProps } from "react-final-form";
import { getValidator } from "helpers";
import { useTranslation } from "react-i18next";

export interface IFilePond extends Partial<FilePondProps> {
  name: string;
  validate?: FieldValidator<any> | FieldValidator<any>[];
  showError?: ShowErrorFunc;
}

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateSize,
  FilePondPluginFileValidateType
);

export const FilePond: FC<IFilePond> = ({ name, validate, ...rest }) => {
  return (
    <Field
      name={name}
      validate={getValidator(validate)}
      render={(fieldRenderProps) => <FilePondWrapper {...fieldRenderProps} {...rest} />}
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

  const serverConfig = {
    load: (imgUrl: any, load: any, error: any) => {
      fetch(imgUrl)
        .then((res) => res.blob())
        .then(load)
        .catch(error);
    },
  };

  return (
    // <div className={clsx(classes.root, isError && classes.error, rest.className)}>
    <div>
      <FilePondRoot
        files={value ? [{ source: value, options: { type: "local" } }] : undefined}
        onupdatefiles={(files) => {
          if (rest.allowMultiple === true) {
            onChange(files.map((f) => f?.file));
          } else {
            onChange(files[0]?.file);
          }
        }}
        // className={classes.pond}
        // labelMaxFileSize={replace(lang.fileLargeThan, ["{filesize}"])}
        // labelMaxFileSizeExceeded={lang.fileIsTooLarge}
        // labelFileTypeNotAllowed={lang.fileTypeNotAllowed}
        // fileValidateTypeLabelExpectedTypes={replace(lang.fileCanBeOnlyThisTypes, "{allButLastType}, {lastType}")}
        server={serverConfig}
        {...rest}
      />
      {isError && <small className="errorText">{error}</small>}
    </div>
  );
};
