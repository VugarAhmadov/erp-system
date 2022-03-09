import styled from "@emotion/styled";
import { Paper } from "@mui/material";

export const StyledPaper = styled(Paper)`
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;

  & .title {
    display: flex;
    align-items: center;
  }

  & .action-buttons {
    display: flex;
    margin-top: 0.5rem;
    gap: 0.5rem;

    & .MuiButton-startIcon {
      margin-right: 0.25rem;
    }
  }
`;
