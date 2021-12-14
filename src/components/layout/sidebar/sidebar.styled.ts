import styled from "@emotion/styled";

export const StyledSidebar = styled.div`
  width: 270px;
  height: 100%;
  background-color: #2c3e50;
  overflow-y: auto;

  & .app-name {
    font-weight: bold;
    text-align: center;
    padding: 1rem;
    color: ${({ theme }) => theme.palette.grey[400]};
  }

  & .nav-menu {
    & .MuiList-root {
      padding-top: 0;

      & .MuiListItem-root {
        padding: 0;

        & .MuiListItemButton-root {
          padding: 0.5rem 1.5rem;

          &:hover {
            & .MuiListItemIcon-root {
              color: #fff;
            }

            & .MuiListItemText-root {
              color: #fff;
            }
          }

          & .MuiListItemIcon-root {
            color: ${({ theme }) => theme.palette.grey[400]};
            min-width: auto;
            margin-right: 1.5rem;
          }

          & .MuiListItemText-root {
            color: ${({ theme }) => theme.palette.grey[400]};
          }
        }
      }
    }
  }
`;
