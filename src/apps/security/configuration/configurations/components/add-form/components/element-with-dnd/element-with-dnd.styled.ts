import styled from "@emotion/styled";

export const StyledElement = styled.div`
  position: absolute;
  margin-bottom: 1rem;
  display: flex;
  cursor: move;

  & .MuiOutlinedInput-input {
    cursor: move;
  }

  & .action-btns {
    display: flex;
    align-items: center;
    margin-left: 0.5rem;

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
`;
