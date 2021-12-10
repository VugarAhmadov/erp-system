import styled from "@emotion/styled";

export const StyledMainLayout = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;

  & .content {
    display: flex;
    flex-direction: column;
    flex: 1;

    & .main-content {
      flex: 1;
      overflow-y: auto;
      background-color: #95a5a6;
      position: relative;
    }
  }
`;
