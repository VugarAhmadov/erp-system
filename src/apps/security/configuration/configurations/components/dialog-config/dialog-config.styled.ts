import styled from "@emotion/styled";

export const StyledDialogConfig = styled.div`
  width: 250px;
  min-width: 200px;
  background-color: rgb(0, 30, 60, 0.92);
  height: 100%;
  max-height: 98%;
  margin-right: 0.4rem;
  border-radius: 4px;
  padding: 1rem;

  & .controls {
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);

    & .MuiFormControl-root {
      width: 100%;
      margin-bottom: 1rem;

      & .MuiOutlinedInput {
        &-root {
          color: #fff;

          & .MuiSvgIcon-root {
            color: #fff;
          }
        }
        &-notchedOutline {
          border-color: rgba(255, 255, 255, 0.5);
        }
      }

      & .MuiInputLabel-root {
        color: rgba(255, 255, 255, 0.7);

        &.Mui-focused {
          color: rgb(144, 202, 249);
        }
      }

      & .Mui-focused {
        & .MuiOutlinedInput-notchedOutline {
          border-color: rgb(144, 202, 249);
        }
      }
    }
  }
`;
