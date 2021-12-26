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
      background-color: #fff;
      position: relative;
      padding: 1rem 5rem;
      overflow-y: auto;
      /* border: 1px solid #000; */
      /* margin: 1rem; */
    }
  }
`;
