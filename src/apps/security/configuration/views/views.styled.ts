import styled from "@emotion/styled";

export const StyledView = styled.div`
  & .views-grid {
    & .views-header {
      display: flex;
      justify-content: space-between;
      margin: 1rem 0;
    }

    & .views-list {
      height: calc(100vh - 220px);
      overflow-y: auto;

      & .MuiListItem-root {
        padding: 0;

        & .MuiListItemButton-root {
          &.Mui-selected {
            background-color: ${({ theme }) => theme.palette.primary.light};
            color: ${({ theme }) => theme.palette.primary.contrastText};
          }
        }
      }
    }
  }

  & .view-detail-grid {
    margin-top: 4rem;
    padding-left: 2rem;

    & .view-detail {
      padding: 0 1.5rem 1rem;
      height: calc(100vh - 220px);
      overflow-y: auto;
      position: relative;

      & .view-detail-header {
        border-bottom: 1px solid ${({ theme }) => theme.palette.grey[400]};
        display: flex;
        justify-content: space-between;
        padding-top: 1rem;
        margin-bottom: 1rem;
        padding-bottom: 0.2rem;
        position: sticky;
        top: 0;
        background-color: #fff;

        & .view-detail-buttons {
          & .edit-btn {
            color: ${({ theme }) => theme.palette.primary.dark};
          }

          & .delete-btn {
            color: ${({ theme }) => theme.palette.error.light};
          }
        }
      }

      & .view-name {
        font-weight: bold;
        color: ${({ theme }) => theme.palette.primary.main};
      }

      & .view-columns {
        list-style: none;
        padding: 0;
        margin: 0;

        & li {
          padding-bottom: 0.3rem;
        }
      }
    }
  }
`;
