import { ReactElement, useState } from "react";
import styled from "styled-components";
import StyledComponents from "../../StyledComponents/StyledComponents";
import { Button, TextField } from "@mui/material";
import usePromptStore from "../../Store/promptStore";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  text-decoration: none;
  float: right;
  button {
    float: right;
    color: white;
    background: hotpink;
    &:hover {
      background: pink;
    }
    &:active {
      background: red;
    }
  }
`;

interface IStyledRockButton {
  isDisabled: boolean;
}

const StyledRockButton = styled(Button)<IStyledRockButton>`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    background-color: ${(props) => props.isDisabled ? 'grey': 'white' }
    color: #272727;
    font-family: Kirby;
    font-size: 1.5rem;
    border: solid 5px #272727;
    padding: 40px 80px;
    position: relative;
    z-index: 1;
    overflow: hidden;
    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      background-color: #007aaf;
      height: 100%;
      width: 100%;
      transform: rotate(-90deg);
      transform-origin: bottom left;
      transition: transform 1s;
      z-index: -1;
    }
    &:hover:before {
      transform: rotate(0deg);
      z-index: -1;
    }
  }
`;

const StyledCancelButton = styled(Button)`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    color: red;
    font-family: Kirby;
    font-size: 1.5rem;
    border: solid 5px #272727;
    padding: 40px 80px;
    position: relative;
    z-index: 1;
    transition: all 1s;
    overflow: hidden;
    &:hover {
      color: white;
    }
    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      background-color: red;
      height: 100%;
      width: 100%;
      transform: translateX(-100%);
      transition: all 1s;
    }
    &:hover:before {
      transform: translateX(0);
      z-index: -1;
    }
  }
`;

const StyledH3 = styled.h3`
  font-family: Kirby;
`;

const StyledStrong = styled.strong`
  font-family: "Crono";
`;

export const Prompts = () => {
  const addPromptArray = usePromptStore((state) => state.addPromptArray);
  const zustandPrompts = usePromptStore((state) => state.prompts);
  const [prompts, setPrompts] = useState<any[]>([]);

  /**
   * This method handles the change in a textfield and sets the prompts within the component's useState implementation
   * for 'prompts'.
   * @param value {String} - the input from the user
   * @param id {Number} - the number representing the 'id' for the prompt object to be
   */
  const handleTextFieldChange = (value: string, id: number) => {
    setPrompts([
      { prompt: value, id },
      ...prompts.filter((el) => el.id !== id),
    ]);
  };

  const resetPrompts = () => {
    setPrompts([]);
    const inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
      let el = inputs[i];
      el.value = "";
    }
  };

  /**
   * This method returns the JSX to render the textFields
   * @returns {JSX}
   */
  const textFields = () => {
    let jsxToReturn = [];
    for (let i = 0; i < 4; i++) {
      const randomId = Math.ceil(Math.random() * 100000);
      jsxToReturn.push(
        <TextField
          data-testid={`prompt-input-${i}`}
          className="text-field-for-prompt"
          key={i}
          variant="outlined"
          onChange={(e: any) => handleTextFieldChange(e.target.value, i)}
        ></TextField>
      );
    }
    return jsxToReturn;
  };

  const determineContinueButtonDisability = () => {
    if (
      prompts.length === 4 &&
      prompts.filter((el) => el.prompt === "").length === 0
    ) {
      return false;
    }
    return true;
  };

  const setComponentPromptsInState = () => {
    addPromptArray(prompts);
  };
  return (
    <StyledComponents.StyledPromptsDialog
      open={true}
      data-testid="prompts-container"
    >
      <h3 data-testid="game-setup-directions">
        Enter 4 descriptions for the AI to make pictures from.
      </h3>
      <p>
        <StyledStrong>Example: </StyledStrong>Starfox helping Ukraine fight
        Putin
      </p>
      {textFields()}
      <StyledRockButton
        disabled={determineContinueButtonDisability()}
        isDisabled={determineContinueButtonDisability()}
        onClick={() => setComponentPromptsInState()}
        data-testid="lets-rock-button"
      >
        <a> Let's Rock!</a>
      </StyledRockButton>
      <StyledCancelButton data-testid="clear-button" onClick={() => resetPrompts()}>
        <a>Clear</a>
      </StyledCancelButton>
    </StyledComponents.StyledPromptsDialog>
  );
};

export default Prompts;
