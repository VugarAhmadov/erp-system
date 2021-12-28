import styled from "@emotion/styled";

export const StyledAddForm = styled.div`
  & .form-header {
    margin-bottom: 1.5rem;
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

  & .component-buttons {
    & .MuiButton-root {
      margin-right: 1rem;
      margin-bottom: 1rem;
    }
  }

  & .input-container {
    position: relative;
    margin-bottom: 1rem;

    & .MuiTextField-root {
      & .MuiIconButton-root {
        & .MuiIcon-root {
          font-size: 1.2rem;
        }

        &.edit-btn {
          color: ${({ theme }) => theme.palette.primary.main};
        }
        &.delete-btn {
          color: ${({ theme }) => theme.palette.error.main};
        }
      }
    }

    & .action-buttons {
      position: absolute;
      top: 0;
      right: 0;

      & .MuiIcon-root {
      }
    }
  }
`;
