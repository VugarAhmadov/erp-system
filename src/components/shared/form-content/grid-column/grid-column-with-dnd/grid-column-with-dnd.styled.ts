import styled from "@emotion/styled";
import { Grid } from "@mui/material";

export const StyledGridColumnWithDnd = styled(Grid)`
  min-height: 40px;
  border-radius: 0.25em;
  position: relative;
  border: 1px dashed #3498db;
  padding: 0.5rem;
  display: flex;

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
