import styled from "@emotion/styled";

export const StyledMainContent = styled.div<{ type: "main" | "tab" }>`
  border: 1px solid ${({ theme }) => theme.palette.grey[300]};
  border-radius: 0.25rem;
  ${({ type }) => type === "main" && "height: calc(100vh - 121px);"};
  ${({ type }) => type === "tab" && "min-height: 120px;"};
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0.5rem;
`;
