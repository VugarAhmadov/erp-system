import styled from "@emotion/styled";

export const StyledForm = styled.form`
  & .MuiTypography-h6 {
    margin-bottom: 1rem;
  }

  & .select-button {
    margin-bottom: 1.5rem;
  }

  & .MuiFormControl-root {
    width: 100%;
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

  & .add-tabs {
    margin-bottom: 2rem;

    & .MuiButton-root {
      margin-bottom: 1rem;
    }
  }

  & .tab-fields {
    & .tab-field {
      display: flex;
      align-items: center;
      margin-bottom: 1.5rem;

      & .MuiFormControl-root {
        margin-bottom: 0;
        margin-right: 1rem;
      }

      & .field-index {
        display: block;
        font-weight: bold;
        margin-right: 1rem;
      }
    }
  }
`;
