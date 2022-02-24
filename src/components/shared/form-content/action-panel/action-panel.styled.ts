import styled from "@emotion/styled";
import { IconButton, Menu } from "@mui/material";

export const StyledMenu = styled(Menu)`
  & .MuiMenu-paper {
    width: 150px;

    & .MuiIcon-root {
      font-size: 1.2rem;
      display: block;
      margin-right: 1.2rem;
    }
  }
`;

export const StyledIconButton = styled(IconButton)<{ align: "left" | "right" }>`
  position: absolute;
  top: -0.8rem;
  ${({ align }) => `${align}: -0.5rem`};
  background-color: ${({ theme }) => theme.palette.grey[100]};
  border: 1px solid ${({ theme }) => theme.palette.grey[300]};
  z-index: 5;

  &:hover {
    background-color: ${({ theme }) => theme.palette.grey[100]};
  }
`;
