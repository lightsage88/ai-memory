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

const StyledH3 = styled.h3`
  font-family: Kirby;
`;

const StyledStrong = styled.strong`
  font-family: 'Crono';
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
      <StyledLink to="/">
        <Button variant="outlined">X</Button>
      </StyledLink>
      <StyledH3 data-testid="game-setup-directions">
        Enter 4 descriptions for the AI to make pictures from.
      </StyledH3>
      <p>
        <StyledStrong>Example: </StyledStrong>Starfox helping Ukraine fight Putin
      </p>
      {textFields()}
      <Button
        disabled={determineContinueButtonDisability()}
        onClick={() => setComponentPromptsInState()}
        data-testid="lets-rock-button"
      >
        Let's Rock!
      </Button>
      <Button data-testid="clear-button" onClick={() => resetPrompts()}>
        Clear
      </Button>
    </StyledComponents.StyledPromptsDialog>
  );
};

export default Prompts;
