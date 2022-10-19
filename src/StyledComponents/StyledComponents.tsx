import styled from "styled-components";
import { Link, Dialog } from "@mui/material";

const StyledNavLink = styled(Link)`
  cursor: pointer
`;

const StyledPromptsDialog = styled(Dialog)`
  .MuiPaper-root {
    padding: 2rem;
    border: solid red 3px;

    div.MuiFormControl-root {
        margin: 0.33rem;
    }
  }
`;

const StyledComponents = {
  StyledNavLink,
  StyledPromptsDialog,
};

export default StyledComponents;
