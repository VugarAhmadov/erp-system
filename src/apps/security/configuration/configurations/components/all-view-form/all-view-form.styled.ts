import styled from "@emotion/styled";

export const StyledForm = styled.form`
  & .views {
    margin-bottom: 1.5rem;
  }

  & .MuiTypography-h5 {
    margin-bottom: 1.5rem;
    border-bottom: 1px solid ${({ theme }) => theme.palette.grey[300]};
    padding-bottom: 1rem;
  }

  & .action-buttons {
    display: flex;
    margin-top: 1.5rem;

    & .MuiButton-root {
      width: 100%;

      &.cancel-btn {
        margin-right: 0.5rem;
      }
      &.submit-btn {
        margin-left: 0.5rem;
      }
    }
  }
`;
