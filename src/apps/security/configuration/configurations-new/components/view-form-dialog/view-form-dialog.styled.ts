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

      & .views {
        margin-bottom: 1.5rem;
      }

      & .MuiTypography-h5 {
        margin-bottom: 1.5rem;
        border-bottom: 1px solid ${({ theme }) => theme.palette.grey[300]};
        padding-bottom: 1rem;
      }

      & .action-buttons {
        display: flex;
        margin-top: 1.5rem;

        & .MuiButton-root {
          width: 100%;

          &.cancel-btn {
            margin-right: 0.5rem;
          }
          &.submit-btn {
            margin-left: 0.5rem;
          }
        }
      }
    }
  }
`;
