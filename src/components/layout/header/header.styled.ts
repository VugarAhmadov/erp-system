import styled from "@emotion/styled";
import { Menu } from "@mui/material";

export const StyledHeader = styled.header`
  height: 50px;
  width: 100%;
  background-color: ${({ theme }) => theme.palette.grey[200]};
  display: flex;
  justify-content: flex-end;
  padding: 5px 1.5rem;

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
    width: 250px;
    justify-content: center;

    & .MuiMenuItem-root {
      display: flex;
      flex-direction: column;
      width: 120px;
      padding: 5px;
      border-radius: 0.5rem;

      & .MuiListItemText-root {
        margin-top: 5px;
        text-align: center;

        & span {
          white-space: break-spaces;
          font-size: 0.875rem;
          text-align: center;
        }
      }

      & .MuiIcon-root {
        font-size: 2.5rem;
      }
    }
  }
`;
