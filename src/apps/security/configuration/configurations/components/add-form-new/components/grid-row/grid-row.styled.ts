import styled from "@emotion/styled";
import { Grid } from "@mui/material";

export const StyledGridRow = styled(Grid)`
  border: 1px dashed #000;
  min-height: 100px;
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  position: relative;

  & .row-delete-btn {
    position: absolute;
    top: -0.8rem;
    right: -0.5rem;
    color: red;
    background-color: ${({ theme }) => theme.palette.grey[100]};
    border: 1px solid ${({ theme }) => theme.palette.grey[300]};
    z-index: 1;
  }
`;
