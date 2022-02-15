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
  }

  & .form {
    display: flex;
    flex-direction: column;

    & .MuiTypography-h6 {
      margin-bottom: 1.5rem;
    }

    & .row {
      display: flex;

      & .col-6:first-of-type {
        margin-right: 0.5rem;
      }

      & .col-6:last-child {
        margin-left: 0.5rem;
      }
    }

    & .MuiTextField-root {
      margin-bottom: 1.5rem;
    }

    & .url-input {
      & .MuiInputAdornment-root p {
        color: #000;
      }

      & .MuiOutlinedInput-input {
        padding-left: 0;
      }
    }

    & .action-buttons {
      display: flex;

      & .MuiButton-root {
        width: 100%;
      }

      & .back-btn {
        margin-right: 0.5rem;
      }
      & .submit-btn {
        margin-left: 0.5rem;
      }
    }
  }
`;
