import styled from "@emotion/styled";
import { Menu } from "@mui/material";

export const StyledHeader = styled.header`
  height: 50px;
  width: 100%;
  background-color: ${({ theme }) => theme.palette.grey[200]};
  display: flex;
  justify-content: flex-end;
  padding: 5px 1.5rem;

  & .apps-container {
  }
`;
