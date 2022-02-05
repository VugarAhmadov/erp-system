import styled from "@emotion/styled";
import { Dialog } from "@mui/material";

export const StyledModal = styled(Dialog)`
  & .MuiDialogContent-root {
    padding: 2rem;

    & .form {
      display: flex;
      flex-direction: column;
      position: relative;
      height: 100%;

      &-elements {
        position: relative;
        height: 600px;
        overflow-y: auto;
      }
    }
  }

  & .MuiDialogActions-root {
    padding: 1rem;
  }
`;
