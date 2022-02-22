import styled from "@emotion/styled";

export const StyledMainContent = styled.div`
  border: 1px solid ${({ theme }) => theme.palette.grey[300]};
  border-radius: 0.25rem;
  height: calc(100vh - 121px);
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0.5rem;
`;
