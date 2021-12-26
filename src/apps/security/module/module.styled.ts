import styled from "@emotion/styled";

export const StyledModule = styled.div`
  & .action-button {
    & .edit-btn {
      color: ${({ theme }) => theme.palette.primary.main};
      margin-right: 1rem;
    }
    & .remove-btn {
      color: ${({ theme }) => theme.palette.error.main};
    }
  }

  & .MuiTableHead-root {
    background-color: ${({ theme }) => theme.palette.grey[300]};

    & .MuiTableCell-root {
      font-weight: bold;
    }
  }
`;
