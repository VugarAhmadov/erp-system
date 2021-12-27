import styled from "@emotion/styled";
import { Menu } from "@mui/material";

export const StyledHeader = styled.header`
  height: 60px;
  width: 100%;
  background-color: ${({ theme }) => theme.palette.grey[200]};
  display: flex;
  justify-content: flex-end;
  padding: 0.6rem 1.5rem;

  & .lang-container {
    margin-right: 1rem;

    & .MuiInputBase-root:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }

    & .MuiSelect-select {
      padding: 0.5rem 0.875rem !important;
    }
  }

  & .apps-container {
    & .apps-button {
      padding: 0.36rem 0.5rem;
      min-width: auto;
      border-color: rgba(0, 0, 0, 0.23);

      &:hover {
        border-color: rgba(0, 0, 0, 0.87);
      }
    }

    & .apps-menu {
      display: flex;
    }
  }
`;

export const StyledAppsMenu = styled(Menu)`
  & .MuiMenu-list {
    display: flex;
    flex-wrap: wrap;
    width: 340px;

    & .menu-item {
      display: flex;
      flex-direction: column;
      width: 110px;
      height: 110px;
      padding: 6px;

      & .MuiIcon-root {
        font-size: 2.5rem;
      }
    }
  }
`;
