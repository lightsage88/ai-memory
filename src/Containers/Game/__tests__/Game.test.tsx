import "@testing-library/jest-dom";
import { render, screen, within, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Game from "../Game";
import { createMemoryHistory } from "history";
describe("The Game Component", () => {
  beforeEach(() => {
    const history = createMemoryHistory();
    render(<Game />);
  });

  it("should first show a collection of empty text input, enable the lets rock button when all fields are filled, and clear all fields/disable the lets rock button when the clear button is clicked", () => {
    const inputCollection = screen.getByTestId("prompts-container");
    const letsRockButton = screen.getByTestId("lets-rock-button");
    const clearButton = screen.getByTestId("clear-button");
    expect(inputCollection).toBeInTheDocument();
    const gameDirections = screen.getByTestId("game-setup-directions");
    expect(gameDirections.textContent).toBe(
      "Enter 8 descriptions for the AI to make pictures from."
    );
    expect(letsRockButton).toBeDisabled();
    const promptInputZeroWrapper = screen.getByTestId("prompt-input-0");
    const promptInputOneWrapper = screen.getByTestId("prompt-input-1");
    const promptInputTwoWrapper = screen.getByTestId("prompt-input-2");
    const promptInputThreeWrapper = screen.getByTestId("prompt-input-3");
    const promptInputFourWrapper = screen.getByTestId("prompt-input-4");
    const promptInputFiveWrapper = screen.getByTestId("prompt-input-5");
    const promptInputSixWrapper = screen.getByTestId("prompt-input-6");
    const promptInputSevenWrapper = screen.getByTestId("prompt-input-7");
    //Prompt Zero
    const promptInputZero = within(promptInputZeroWrapper).getByRole(
      "textbox"
    ) as HTMLInputElement;
    fireEvent.change(promptInputZero, { target: { value: "Test Value Zero" } });
    expect(promptInputZero.value).toBe("Test Value Zero");
    //Prompt One
    const promptInputOne = within(promptInputOneWrapper).getByRole(
      "textbox"
    ) as HTMLInputElement;
    fireEvent.change(promptInputOne, { target: { value: "Test Value One" } });
    expect(promptInputOne.value).toBe("Test Value One");
    //Prompt Two
    const promptInputTwo = within(promptInputTwoWrapper).getByRole(
      "textbox"
    ) as HTMLInputElement;
    fireEvent.change(promptInputTwo, { target: { value: "Test Value Two" } });
    expect(promptInputTwo.value).toBe("Test Value Two");
    //Prompt Three
    const promptInputThree = within(promptInputThreeWrapper).getByRole(
      "textbox"
    ) as HTMLInputElement;
    fireEvent.change(promptInputThree, {
      target: { value: "Test Value Three" },
    });
    expect(promptInputThree.value).toBe("Test Value Three");
    //Prompt Four
    const promptInputFour = within(promptInputFourWrapper).getByRole(
      "textbox"
    ) as HTMLInputElement;
    fireEvent.change(promptInputFour, { target: { value: "Test Value Four" } });
    expect(promptInputFour.value).toBe("Test Value Four");
    //Prompt Five
    const promptInputFive = within(promptInputFiveWrapper).getByRole(
      "textbox"
    ) as HTMLInputElement;
    fireEvent.change(promptInputFive, { target: { value: "Test Value Five" } });
    expect(promptInputFive.value).toBe("Test Value Five");
    //Prompt Six
    const promptInputSix = within(promptInputSixWrapper).getByRole(
      "textbox"
    ) as HTMLInputElement;
    fireEvent.change(promptInputSix, { target: { value: "Test Value Six" } });
    expect(promptInputSix.value).toBe("Test Value Six");
    //Prompt Seven
    const promptInputSeven = within(promptInputSevenWrapper).getByRole(
      "textbox"
    ) as HTMLInputElement;
    fireEvent.change(promptInputSeven, {
      target: { value: "Test Value Seven" },
    });
    expect(promptInputSeven.value).toBe("Test Value Seven");
    //Lets Rock Button is Enabled
    expect(letsRockButton).not.toBeDisabled();
    //Click the clear button
    fireEvent.click(clearButton);
    expect(letsRockButton).toBeDisabled();
    expect(promptInputZero.value).toBe("");
    expect(promptInputOne.value).toBe("");
    expect(promptInputTwo.value).toBe("");
    expect(promptInputThree.value).toBe("");
    expect(promptInputFour.value).toBe("");
    expect(promptInputFive.value).toBe("");
    expect(promptInputSix.value).toBe("");
    expect(promptInputSeven.value).toBe("");
  });
});
