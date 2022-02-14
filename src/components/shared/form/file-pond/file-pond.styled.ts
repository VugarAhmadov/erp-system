import styled from "@emotion/styled";

export const StyledFilePond = styled.div`
  display: block;
  width: 100%;

  & .filepond--credits {
    display: none;
  }

  & .filepond--hopper {
    margin: 0;
  }

  & .filepond--drop-label: {
    height: auto;
    min-height: auto;
  }

  & .filepond--panel-root {
    border: 1px dashed ${({ theme }) => theme.palette.grey[800]};
    border-radius: 8px;
  }

  & .filepond--file-status {
    align-items: flex-start;
    flex-shrink: unset !important;
    text-align: left;
    padding-left: 8;

    & .filepond--file-status-sub {
      opacity: .7,
      font-size: 11px,
      line-height: 1.2,
      margin-top: 2rem,
      white-space: break-spaces,
    }
  }

  & .error {
    & .filepond--panel-root {
      border: 1px solid red;
    }
  }

  & .error-text {
    color: red;
    font-size: 0.75rem;
  },
`;
