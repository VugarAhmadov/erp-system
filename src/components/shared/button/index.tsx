import React, { forwardRef } from "react";
import { ButtonProps, CircularProgress } from "@mui/material";
import { StyledButton, StyledLoadingDiv } from "./button.styled";

export const Button = forwardRef(
  <C extends React.ElementType>(
    props: ButtonProps<C, { component?: C; loading?: boolean }>,
    ref?: React.Ref<HTMLButtonElement>
  ) => {
    const { children, loading, disabled, ...rest } = props;

    return (
      <StyledButton variant="contained" disabled={disabled || loading} {...rest} ref={ref}>
        {children}
        {loading && (
          <StyledLoadingDiv>
            <CircularProgress color="inherit" size={16} />
          </StyledLoadingDiv>
        )}
      </StyledButton>
    );
  }
);
