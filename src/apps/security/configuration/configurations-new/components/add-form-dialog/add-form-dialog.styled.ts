import styled from "@emotion/styled";
import Dialog from "@mui/material/Dialog";

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

      & .form-header {
        margin-bottom: 1rem;
        border-bottom: 1px solid ${({ theme }) => theme.palette.grey[300]};
        padding-bottom: 1rem;
        display: flex;
        justify-content: space-between;

        & .action-buttons {
          & .submit-btn {
            margin-right: 1rem;
          }
        }
      }
    }
  }
`;
