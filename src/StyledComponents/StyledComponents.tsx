import styled from "styled-components";
import { Link, Dialog, Box } from "@mui/material";
import "../App.css";

const StyledBox = styled(Box)`
  border: 2px brown solid;
  background-position: 0px 0px, 10px 10px;
  background-size: 20px 20px;
  background-image: linear-gradient(
      45deg,
      #f5080894 25%,
      transparent 25%,
      transparent 75%,
      #fb09098a 75%,
      #fd0d0d91 100%
    ),
    linear-gradient(
      45deg,
      #e501019e 25%,
      #ebb00a96 0%,
      white 75%,
      #f9020291 0%,
      #f1020299 100%
    );
  border-bottom-right-radius: 1vw;
  display: flex;
  justify-content: space-around;
  font-family: Kirby;
  a {
    margin: 0.45rem;
    border-radius: 2vw;
    border: solid gold 5px;
    border-style: outset;
    background: pink;
    text-decoration: none;
    padding: 1vw 2vw;
    &:hover {
      transition: all 2s;
      background: gold;
      border-color: hotpink;
      color: red;
    }
  }
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
