import styled from "@emotion/styled";

export const StyledElementContainer = styled.div`
  position: relative;
  margin-bottom: 1rem;

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
`;
