import styled from "@emotion/styled";
import { Dialog } from "@mui/material";

export const StyledDialog = styled(Dialog)`
  & .MuiDialog-container {
    justify-content: flex-end;

    & .MuiDialog-paper {
      margin: 0.4rem;
      height: 100%;
      max-height: 98%;
    }
  }

  & .view-title {
    margin-bottom: 1.5rem;
  }

  & .insert-form {
    position: sticky;
    top: 0;

    & .action-buttons {
      margin-bottom: 2rem;

      & .back-btn {
        margin-right: 1.5rem;
      }
    }
  }

  & .table-list {
    & .table {
      &.Mui-expanded {
        margin: 0;

        &:before {
          opacity: 1;
        }
      }

      & .MuiAccordionSummary-root {
        &.Mui-expanded {
          min-height: auto;
        }

        & .MuiAccordionSummary-content {
          margin: 10px 0;

          & .MuiTypography-body1 {
            color: ${({ theme }) => theme.palette.primary.dark};
          }
        }
      }

      & .MuiAccordionDetails-root {
        padding-top: 0;

        & .table-columns {
          padding: 0;
          margin: 0;
          list-style: none;

          /* & li {
            margin-bottom: 5px;
            padding-bottom: 3px;
            border-bottom: 1px solid ${({ theme }) => theme.palette.grey[300]};
          } */
        }
      }
    }
  }
`;
