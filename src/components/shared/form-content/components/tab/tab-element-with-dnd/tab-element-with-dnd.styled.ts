import styled from "@emotion/styled";

export const StyledTabElementWithDnd = styled.div<{ orientation: string }>`
  margin-bottom: 1rem;
  display: flex;
  cursor: move;
  width: 100%;
  position: relative;

  & .MuiOutlinedInput-input {
    cursor: move;
  }

  & .tab-container {
    width: 100%;
    display: flex;
    flex-direction: ${({ orientation }) => (orientation === "horizontal" ? "column" : "row")};

    & .tab-panel {
      width: 100%;
    }
  }
`;
