import styled from "@emotion/styled";
import { FormControl } from "@mui/material";

export const StyledFormControl = styled(FormControl)`
  & .MuiSelect-root {
    cursor: move;
  }
  & .MuiSelect-select {
    cursor: move;
  }

  & .MuiInputBase-root {
    cursor: move;
  }
`;
