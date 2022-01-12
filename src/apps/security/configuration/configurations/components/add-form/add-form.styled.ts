import styled from "@emotion/styled";

export const StyledAddForm = styled.div`
  height: 100%;

  & .form-header {
    margin-bottom: 1rem;
    border-bottom: 1px solid ${({ theme }) => theme.palette.grey[300]};
    padding-bottom: 1rem;
    display: flex;
    justify-content: space-between;

    & .action-buttons {
      & .submit-btn {
        margin-right: 1rem;
      }
    }
  }

  & .grid-control {
    display: flex;
    border: 1px solid ${({ theme }) => theme.palette.grey[300]};
    border-radius: 0.4rem;
    padding: 1rem;
    margin-bottom: 1rem;

    & .dialog-size {
      min-width: 100px;
      margin-right: 1rem;
    }
    & .grid-view {
      min-width: 100px;
    }
  }

  & .component-buttons {
    border: 1px solid ${({ theme }) => theme.palette.grey[300]};
    border-radius: 0.4rem;
    padding: 1rem 1rem 0 1rem;
    margin-bottom: 1rem;

    & .MuiButton-root {
      margin-right: 1rem;
      margin-bottom: 1rem;
    }
  }

  & .drag-container {
    height: calc(100% - 290px);
    position: relative;
    border: 1px solid ${({ theme }) => theme.palette.grey[300]};
    border-radius: 0.4rem;
    padding: 1rem 1rem 0 1rem;
    overflow-y: auto;

    &.grid-view {
      background-image: linear-gradient(rgba(132, 134, 245, 0.1) 0.05em, transparent 0.1em),
        linear-gradient(90deg, rgba(132, 134, 245, 0.1) 0.05em, transparent 0.1em);
      background-size: 1.2rem 1.05rem;
      background-position-y: 5px;
    }
  }
`;
