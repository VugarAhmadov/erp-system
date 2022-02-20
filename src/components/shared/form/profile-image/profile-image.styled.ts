import styled from "@emotion/styled";

export const StyledProfileImage = styled.div`
  position: relative;

  & .img {
    height: 100%;
    width: 100%;
  }

  & .icon-btn {
    position: absolute;
    top: 0.25rem;
    right: 0.25rem;
    background-color: rgba(0, 0, 0, 0.5);
    border: 1px solid #ccc;
    color: #fff;
    opacity: 0;
    visibility: hidden;
    transition: ${({ theme }) =>
      theme.transitions.create(["visibility", "opacity"], {
        duration: theme.transitions.duration.standard,
      })};

    & .MuiIcon-root {
      font-size: 1rem;
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }

  &:hover {
    & .icon-btn {
      opacity: 1;
      visibility: visible;
    }
  }
`;
