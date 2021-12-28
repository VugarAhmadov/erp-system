import styled from "@emotion/styled";

export const StyledAddForm = styled.div`
  & .MuiTypography-h5 {
    margin-bottom: 1.5rem;
  }

  & .component-buttons {
    & .MuiButton-root {
      margin-right: 1rem;
      margin-bottom: 1rem;
    }
  }

  & .input-container {
    position: relative;

    & .MuiTextField-root {
      width: 100%;
    }

    & .action-buttons {
      position: absolute;
      top: 0;
      right: 0;

      & .MuiIcon-root {
        font-size: 1rem;
      }
    }
  }
`;
