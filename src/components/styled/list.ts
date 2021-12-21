import styled from "@emotion/styled";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

export const StyledList = styled(List)`
  height: calc(100vh - 220px);
  overflow-y: auto;
`;

export const StyledListItem = styled(ListItem)`
  padding: 0;
`;

export const StyledListItemButton = styled(ListItemButton)`
  &.Mui-selected {
    background-color: ${({ theme }) => theme.palette.primary.light};
    color: ${({ theme }) => theme.palette.primary.contrastText};
  }
`;

export const StyledListItemText = styled(ListItemText)`
  margin: 0;
`;
