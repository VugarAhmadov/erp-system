import styled from "@emotion/styled";

export const StyledTabElementWithDnd = styled.div`
  margin-bottom: 1rem;
  display: flex;
  cursor: move;
  width: 100%;
  position: relative;

  & .MuiOutlinedInput-input {
    cursor: move;
  }
`;
