import React, { FC } from "react";
import { CircularProgress } from "@mui/material";
import { StyledBox } from "./spinner.styled";

export const Spinner: FC = () => {
  return (
    <StyledBox>
      <CircularProgress />
    </StyledBox>
  );
};
