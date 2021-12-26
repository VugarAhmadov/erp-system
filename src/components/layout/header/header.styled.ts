import styled from "@emotion/styled";

export const StyledHeader = styled.header`
  height: 60px;
  width: 100%;
  background-color: ${({ theme }) => theme.palette.grey[200]};
  display: flex;
  justify-content: flex-end;
  padding: 0rem 2rem;

  & .lang {
  }
`;
