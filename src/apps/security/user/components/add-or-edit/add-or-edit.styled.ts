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

    & .grid-container {
      display: grid;
      grid-auto-flow: column;
      grid-template-rows: repeat(5, 0.7fr);
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem 1rem;
      margin-bottom: 1.5rem;
    }

    & .photo-container {
      display: flex;
      justify-content: center;
      margin-bottom: 2rem;
      position: relative;
      height: 137px;
    }

    & .MuiTypography-h6 {
      margin-bottom: 1.5rem;
    }

    & .action-buttons {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 1rem;
    }
  }
`;
