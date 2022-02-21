import styled from "@emotion/styled";

export const StyledConfigurations = styled.div`
  padding: 1rem 0;

  & .application {
    border-radius: 0.4rem;
    margin-bottom: 1rem;

    &:before {
      content: none;
    }

    &:last-of-type {
      border-radius: 0.4rem;
    }

    & > .MuiAccordionSummary-root {
      background-color: ${({ theme }) => theme.palette.primary.main};
      border-radius: 0.4rem;

      & .MuiAccordionSummary-content {
        color: #fff;
      }

      & .MuiAccordionSummary-expandIconWrapper {
        color: #fff;
      }
    }

    & .module .MuiAccordionSummary-root {
      background-color: #fded9f;
    }

    & .MuiAccordionSummary-root.Mui-expanded {
      min-height: auto;
    }
    & .MuiAccordionSummary-content.Mui-expanded {
      margin: 0.75rem 0;
    }
  }

  & .MuiTableRow-head {
    background-color: #ecf0f1;

    & th {
      font-weight: bold;
      font-size: 1rem;
    }
  }

  & .MuiTableCell-root {
    padding: 0.5rem;
  }
`;
