import styled from "@emotion/styled";

export const StyledForm = styled.form`
  & .MuiTypography-h6 {
    margin-bottom: 1rem;
  }

  & .select-button {
    margin-bottom: 1.5rem;
  }

  & .MuiFormControl-root {
    margin-bottom: 1.5rem;
  }

  & .action-buttons {
    display: flex;
    margin-top: 1rem;

    & .MuiButton-root {
      width: 100%;
    }

    & .cancel-btn {
      margin-right: 0.5rem;
    }

    & .add-btn {
      margin-left: 0.5rem;
    }
  }
`;
