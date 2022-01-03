import styled from "@emotion/styled";
import { TextField } from "@mui/material";

export const StyledTextField = styled(TextField)`
  & .MuiInputBase-root {
    cursor: move;
  }

  & .MuiInputBase-input {
    cursor: move;
  }

  /* 
  & .action-buttons {
    position: absolute;
    top: 0;
    right: 0;
  } */
`;
