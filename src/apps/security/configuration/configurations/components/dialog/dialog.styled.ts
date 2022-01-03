import styled from "@emotion/styled";
import { Dialog } from "@mui/material";

export const StyledDialog = styled(Dialog)`
  & .MuiDialog-container {
    justify-content: flex-end;

    & .MuiDialog-paper {
      margin: 0.4rem;
      height: 100%;
      max-height: 98%;
    }

    & .MuiDialogContent-root {
      padding: 1rem;
    }
  }
`;
