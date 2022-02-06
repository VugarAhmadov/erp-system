import styled from "@emotion/styled";

export const StyledSidebar = styled.div`
  min-width: 100px;
  width: 100px;
  height: 100%;
  background-color: #fded9f;
  overflow-y: auto;

  & .app-name {
    font-weight: bold;
    text-align: center;
    line-height: 1.13rem;
    padding: 0.4rem 0;
    color: #000;
    border-bottom: 1px solid #c4b87b;
    margin-bottom: 0.4rem;
    /* #FDED9F */
    /* #FF6600 */
    /* #fc9f00 */
  }

  & .nav-menu {
    & .MuiList-root {
      padding-top: 0;

      & .MuiListItem-root {
        padding: 0;

        & .MuiListItemButton-root {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 0.3rem 1.5rem;

          &.Mui-selected {
            background-color: #c4b87b;
          }

          & .MuiListItemIcon-root {
            color: #000;
            min-width: auto;
          }

          & .MuiListItemText-root {
            color: #000;

            & span {
              font-size: 0.9rem;
            }
          }
        }
      }
    }
  }
`;
