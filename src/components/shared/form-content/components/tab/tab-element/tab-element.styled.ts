import styled from "@emotion/styled";

export const StyledTabElement = styled.div<{ orientation: string }>`
  width: 100%;
  display: flex;
  flex-direction: ${({ orientation }) => (orientation === "horizontal" ? "column" : "row")};

  & .tab-panel {
    width: 100%;
    padding: ${({ orientation }) => (orientation === "horizontal" ? "1rem 0" : "0 1rem")};
  }
`;
