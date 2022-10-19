import styled from "styled-components";
import { Link, Dialog, Box } from "@mui/material";

const StyledBox = styled(Box)`
  @font-face {
    font-family: Kirby;
    src: local("Kirby") url("../Assets/Fonts/kirby-classic.ttf")
      format("truetype");
  }
  border: 3px #007aaf solid;
  display: flex;
  justify-content: space-around;
  font-family: "Kirby";
`;

const StyledNavLink = styled(Link)`
  cursor: pointer;
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
  StyledBox,
  StyledNavLink,
  StyledPromptsDialog,
};

export default StyledComponents;
