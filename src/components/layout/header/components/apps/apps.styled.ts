import styled from "@emotion/styled";
import { Menu } from "@mui/material";

export const StyledApps = styled.div`
  & .apps-button {
    padding: 0.36rem 0.5rem;
    min-width: auto;
    border-color: rgba(0, 0, 0, 0.23);
    height: 100%;

    &:hover {
      border-color: rgba(0, 0, 0, 0.87);
    }
  }
`;

export const StyledAppsMenu = styled(Menu)`
  & .MuiMenu-list {
    display: flex;
    flex-wrap: wrap;
    max-width: 250px;
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
