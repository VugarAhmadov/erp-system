import styled from "@emotion/styled";
import { Dialog } from "@mui/material";

export const StyledDialog = styled(Dialog)`
  & .MuiDialog-container {
    justify-content: flex-end;

    & .MuiDialog-paper {
      margin: 0.4rem;
      height: 100%;
      max-height: 98%;

      & .MuiTypography-h6 {
        margin-bottom: 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid ${({ theme }) => theme.palette.grey[300]};
      }

      & .MuiFormControl-root {
        width: 100%;
        margin-bottom: 1.5rem;
      }

      & .action-buttons {
        display: flex;

        & .MuiButton-root {
          width: 100%;
          &:first-child {
            margin-right: 0.5rem;
          }
          &:last-child {
            margin-left: 0.5rem;
          }
        }
      }
    }
  }
`;
