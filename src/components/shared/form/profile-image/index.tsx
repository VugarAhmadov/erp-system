import React from "react";
import { Icon, IconButton } from "@mui/material";
import { Img } from "react-image";
import { StyledProfileImage } from "./profile-image.styled";
import { Field, FieldProps } from "react-final-form";

interface IProfileImage {
  name: string;
  fieldProps: Partial<Omit<FieldProps<any, any>, "validate">>;
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

export const ProfileImageWrapper = () => {
  return (
    <StyledProfileImage>
      <Img src="/images/avatar.svg" className="img" />
      <IconButton className="delete-icon" size="small">
        <Icon>delete</Icon>
      </IconButton>
    </StyledProfileImage>
  );
};
