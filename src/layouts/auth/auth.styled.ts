import styled from "@emotion/styled";

export const StyledAuthLayout = styled.div`
  background: -webkit-linear-gradient(to right, #4b1248, #f0c27b);
  background: #f0c27b;
  background: linear-gradient(to right, #4b1248, #f0c27b);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  & .content {
    width: 400px;
    height: 370px;
    background-color: #ecf0f1;
    border-radius: 1.5rem;
    z-index: 8;
    padding: 2rem 3rem;
    text-align: center;

    & .MuiTypography-h4 {
      margin-bottom: 1.5rem;
      color: #2c3e50;
    }
  }
`;
