import React, { ChangeEvent, Suspense, useState } from "react";
import { Icon, IconButton } from "@mui/material";
import { useImage } from "react-image";
import { StyledProfileImage } from "./profile-image.styled";
import { Field, FieldProps } from "react-final-form";
import { defaultRequest, showErrorOnChange } from "helpers";
import { Spinner } from "components/shared";
import { commonApi } from "api";

interface IProfileImage {
  name: string;
  fieldProps?: Partial<Omit<FieldProps<any, any>, "validate">>;
  width?: number;
}

export const ProfileImage = (props: IProfileImage) => {
  const { name, fieldProps, ...rest } = props;

  return (
    <Field
      name={name}
      render={({ input, meta }) => <ProfileImageWrapper input={input} meta={meta} name={name} {...rest} />}
      {...fieldProps}
    />
  );
};

const Img = (props: any) => {
  const { src } = useImage({
    srcList: [
      props.value && props.value !== "0"
        ? `http://173.212.212.209:8182/DispatcherRest/api/get/file/${props.value}`
        : "/images/avatar.svg",
      "/images/avatar.svg",
    ],
    useSuspense: true,
    // imgPromise:
  });

  return <img src={src} className="img" width={props.width} />;
};

interface IProfileImageWrapper {}

export const ProfileImageWrapper = (props: FieldProps<any, any>) => {
  const {
    input: { name, value, onChange, ...restInput },
    // meta,
    // required,
    // fullWidth,
    // helperText,
    // showError = showErrorOnChange,
    ...rest
  } = props;

  // const { error, submitError } = meta;
  // const isError = showError({ meta });

  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      for (let i = 0; i < e.target.files.length; i++) {
        setLoading(true);
        await commonApi.uploadFile(e.target.files[i]).then((res) => {
          if (res.data && res.data.code === "OK" && res.data.data) {
            onChange(res.data.data);
          }
        });
      }
      setLoading(false);
      e.target.value = "";
    }
  };

  const handleDelete = async () => {
    await commonApi.removeFile(value).then(({ data }) => {
      if (data.code === "OK") {
        onChange("0");
      } else {
        onChange("0"); // TODO helelik yazmisa daha yaxsi yolunu tapmaq lazimdi
        // error(data.message);
      }
    });
    // .catch((e) => error(e));
  };

  return (
    <StyledProfileImage>
      <Suspense fallback={<Spinner />}>
        <Img value={value} />
      </Suspense>
      {value && value !== "0" ? (
        <IconButton className="icon-btn" size="small" onClick={handleDelete}>
          <Icon>delete</Icon>
        </IconButton>
      ) : (
        <label htmlFor="icon-button-file">
          <input
            accept="image/x-png,image/jpeg,image/jpg"
            id="icon-button-file"
            type="file"
            style={{ display: "none" }}
            onChange={handleUpload}
          />
          <IconButton color="primary" aria-label="upload picture" component="span" className="icon-btn">
            <Icon>upload</Icon>
          </IconButton>
        </label>
      )}

      {loading && <Spinner />}

      <input name={name} value={value} type="hidden" {...restInput} />
    </StyledProfileImage>
  );
};
