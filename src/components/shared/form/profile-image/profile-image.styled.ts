import styled from "@emotion/styled";

export const StyledProfileImage = styled.div`
  position: relative;

  & .img {
    height: 100%;
    width: 100%;
  }

  & .delete-icon {
    position: absolute;
    top: 0.25rem;
    right: 0.25rem;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    opacity: 0;
    visibility: hidden;
    transition: ${({ theme }) =>
      theme.transitions.create(["visibility", "opacity"], {
        duration: theme.transitions.duration.short,
      })};

    & .MuiIcon-root {
      font-size: 1rem;
    }
  }

  &:hover {
    & .delete-icon {
      opacity: 1;
      visibility: visible;
    }
  }
`;
