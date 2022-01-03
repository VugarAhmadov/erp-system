import styled from "@emotion/styled";
import { Menu } from "@mui/material";

export const StyledProfile = styled.div`
  margin-right: 1rem;

  & .profile-button {
    padding: 0.36rem 0.5rem;
    min-width: auto;
    border-color: rgba(0, 0, 0, 0.23);
    height: 100%;

    &:hover {
      border-color: rgba(0, 0, 0, 0.87);
    }
  }
`;

export const StyledProfileMenu = styled(Menu)`
  & .profile-info {
    padding: 1rem 2rem;
    text-align: center;

    & .profile-image {
      width: 80px;
    }
  }
`;
