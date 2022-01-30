import styled from "@emotion/styled";
import { Grid } from "@mui/material";

export const StyledGridColumn = styled(Grid)`
  min-height: 80px;
  border-radius: 0.25em;
  position: relative;
  border: 1px dashed #3498db;
  padding: 0.5rem;

  & .column-delete-btn {
    position: absolute;
    top: -0.8rem;
    left: -0.5rem;
    color: #8e44ad;
    background-color: ${({ theme }) => theme.palette.grey[100]};
    border: 1px solid ${({ theme }) => theme.palette.grey[300]};
    z-index: 1;

    & .MuiIcon-root {
      font-size: 1rem;
    }
  }
`;
