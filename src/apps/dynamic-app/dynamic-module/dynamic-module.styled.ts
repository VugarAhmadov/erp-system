import styled from "@emotion/styled";

export const StyledDynamicModule = styled.div`
  & .action-buttons {
    & .MuiIcon-root {
      font-size: 1rem;
    }

    & .edit-btn {
      border: 1px solid ${({ theme }) => theme.palette.primary.main};
      color: ${({ theme }) => theme.palette.primary.main};
      margin-right: 0.5rem;
    }

    & .remove-btn {
      border: 1px solid ${({ theme }) => theme.palette.error.main};
      color: ${({ theme }) => theme.palette.error.main};
    }
  }
`;
