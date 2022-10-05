import { ReactElement, useState } from "react";
import StyledComponents from "../../StyledComponents/StyledComponents";
import { Button, TextField } from "@mui/material";
import usePromptStore from "../../Store/promptStore";

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
    const inputs = document.getElementsByClassName("text-field-for-prompt");
    $(".MuiInputBase-input").val("");
  };

  /**
   * This method returns the JSX to render the textFields
   * @returns {JSX}
   */
  const textFields = () => {
    let jsxToReturn = [];
    for (let i = 0; i < 8; i++) {
      const randomId = Math.ceil(Math.random() * 100000);
      jsxToReturn.push(
        <TextField
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
      prompts.length === 8 &&
      prompts.filter((el) => el.prompt === "").length === 0
    ) {
      return false;
    }
    return true;
  };

  const setComponentPromptsInState = () => {
    addPromptArray(prompts);
  };
  console.log('zustandPrompts: ', zustandPrompts);
  return (
    <StyledComponents.StyledPromptsDialog open={true}>
      <h3>Enter 8 descriptions for the AI to make pictures from.</h3>
      <p>
        <strong>Example: </strong>Starfox helping Ukraine fight Putin
      </p>
      {textFields()}
      <Button
        disabled={determineContinueButtonDisability()}
        onClick={() => setComponentPromptsInState()}
      >
        Let's Rock!
      </Button>
      <Button onClick={() => resetPrompts()}>Clear</Button>
    </StyledComponents.StyledPromptsDialog>
  );
};

export default Prompts;
