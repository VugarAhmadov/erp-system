import styled from "@emotion/styled";
import { DialogContent } from "@mui/material";

export const StyledDialogContent = styled(DialogContent)`
  & .form-body {
    border: 1px solid ${({ theme }) => theme.palette.grey[300]};
    border-radius: 0.25rem;
    height: calc(100vh - 121px);
    overflow-x: hidden;
    overflow-y: auto;
    padding: 0.5rem;

    &.grid-view {
      background-image: linear-gradient(rgba(132, 134, 245, 0.1) 0.05em, transparent 0.1em),
        linear-gradient(90deg, rgba(132, 134, 245, 0.1) 0.05em, transparent 0.1em);
      background-size: 1.2rem 1.05rem;
      background-position-y: -1px;
      background-position-x: -1px;
    }

    & .grid-row {
    }
  }
`;
