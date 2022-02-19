import styled from "@emotion/styled";

export const StyledDialogConfig = styled.div`
  width: 270px;
  min-width: 200px;
  background-color: rgb(0, 30, 60, 0.92);
  height: 100%;
  overflow-y: auto;
  max-height: 98%;
  margin-right: 0.4rem;
  border-radius: 4px;
  padding: 1rem;

  & .controls {
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    margin-bottom: 1rem;

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

  & .layout-components {
    margin-bottom: 1rem;

    & .heading {
      color: #fff;
      margin-bottom: 0.25rem;
    }

    & .MuiList-root {
      padding: 0;

      & .MuiListItemButton-root {
        padding: 0.25rem 1rem;
        border: 1px solid rgba(255, 255, 255, 0.5);
        border-radius: 0.25rem;
        margin-bottom: 0.5rem;
        cursor: move;

        & .column-size {
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

            &-input {
              padding: 0.25rem 2rem 0.25rem 0.5rem;
            }
          }
        }

        & .MuiListItemIcon-root {
          color: #fff;
          min-width: auto;
          margin-right: 1rem;
        }

        & .MuiListItemText-root {
          color: #fff;
          margin: 0;
        }
      }
    }
  }
`;
