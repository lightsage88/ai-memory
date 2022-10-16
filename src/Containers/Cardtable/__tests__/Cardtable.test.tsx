import "@testing-library/jest-dom";
import {
  render,
  screen,
  within,
  fireEvent,
  cleanup,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AppWrapper from "../../../AppWrapper";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
describe("The Cardtable", () => {
  const ENV = process.env;
  beforeEach(async () => {
    jest.resetModules();
    jest.runOnlyPendingTimers();
    //TODO:FIND WAY TO RESET STATE
    process.env = { ...ENV };
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <AppWrapper />
      </Router>
    );
    const user = userEvent.setup();
    const gameTab = screen.getByTestId("game-tab");
    await user.click(gameTab);
  });

  afterEach(() => {
    cleanup();
  });

  it('should show a message about waiting for the art to be made once the "Lets Rock" button is clicked', () => {
    process.env.REACT_APP_USE_MOCK_DATA = "true";
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
    fireEvent.change(promptInputZero, { target: { value: "Mario" } });
    expect(promptInputZero.value).toBe("Mario");
    //Prompt One
    const promptInputOne = within(promptInputOneWrapper).getByRole(
      "textbox"
    ) as HTMLInputElement;
    fireEvent.change(promptInputOne, { target: { value: "Luigi" } });
    expect(promptInputOne.value).toBe("Luigi");
    //Prompt Two
    const promptInputTwo = within(promptInputTwoWrapper).getByRole(
      "textbox"
    ) as HTMLInputElement;
    fireEvent.change(promptInputTwo, { target: { value: "Zelda" } });
    expect(promptInputTwo.value).toBe("Zelda");
    //Prompt Three
    const promptInputThree = within(promptInputThreeWrapper).getByRole(
      "textbox"
    ) as HTMLInputElement;
    fireEvent.change(promptInputThree, {
      target: { value: "Ganondorf" },
    });
    expect(promptInputThree.value).toBe("Ganondorf");
    //Prompt Four
    const promptInputFour = within(promptInputFourWrapper).getByRole(
      "textbox"
    ) as HTMLInputElement;
    fireEvent.change(promptInputFour, { target: { value: "Opera" } });
    expect(promptInputFour.value).toBe("Opera");
    //Prompt Five
    const promptInputFive = within(promptInputFiveWrapper).getByRole(
      "textbox"
    ) as HTMLInputElement;
    fireEvent.change(promptInputFive, { target: { value: "Cats on Cheese" } });
    expect(promptInputFive.value).toBe("Cats on Cheese");
    //Prompt Six
    const promptInputSix = within(promptInputSixWrapper).getByRole(
      "textbox"
    ) as HTMLInputElement;
    fireEvent.change(promptInputSix, { target: { value: "Mexico" } });
    expect(promptInputSix.value).toBe("Mexico");
    //Prompt Seven
    const promptInputSeven = within(promptInputSevenWrapper).getByRole(
      "textbox"
    ) as HTMLInputElement;
    fireEvent.change(promptInputSeven, {
      target: { value: "China" },
    });
    expect(promptInputSeven.value).toBe("China");
    //Lets Rock Button is Enabled
    expect(letsRockButton).not.toBeDisabled();
    //Click the Lets Rock Button
    fireEvent.click(letsRockButton);
  });

  it("should show the mock data cards; there should be two per each prompt", () => {
    process.env.REACT_APP_USE_MOCK_DATA = "true";

    //Show cards
    const cardBackImageCards = screen.queryAllByTestId("cardback-image");
    expect(cardBackImageCards).toHaveLength(16);
    const catsOnCheeseCards = screen.queryAllByTestId("cats on cheese");
    expect(catsOnCheeseCards).toHaveLength(2);
    const chinaCards = screen.queryAllByTestId("china");
    expect(chinaCards).toHaveLength(2);
    const ganondorfCards = screen.queryAllByTestId("ganondorf");
    expect(ganondorfCards).toHaveLength(2);
    const marioCards = screen.queryAllByTestId("mario");
    expect(marioCards).toHaveLength(2);
    const mexicoCards = screen.queryAllByTestId("mexico");
    expect(mexicoCards).toHaveLength(2);
    const luigiCards = screen.queryAllByTestId("luigi");
    expect(luigiCards).toHaveLength(2);
    const operaCards = screen.queryAllByTestId("opera");
    expect(operaCards).toHaveLength(2);
    const zeldaCards = screen.queryAllByTestId("zelda");
    expect(zeldaCards).toHaveLength(2);
  });

  it("should display an image when a card is clicked", () => {
    process.env.REACT_APP_USE_MOCK_DATA = "true";
    const firstCardBackImageCards = screen.queryAllByTestId("cardback-image");
    expect(firstCardBackImageCards).toHaveLength(16);
    const marioCards = screen.queryAllByTestId("mario");
    expect(marioCards).toHaveLength(2);
    fireEvent.click(marioCards[0]);
    const marioImage = screen.queryAllByTestId("mario-image");
    expect(marioImage).toHaveLength(1);
    expect(screen.queryAllByTestId("cardback-image")).toHaveLength(15);
  });

  it("should flip cards over if they are not related", () => {
    process.env.REACT_APP_USE_MOCK_DATA = "true";
    jest.useFakeTimers();
    const firstCardBackImageCards = screen.queryAllByTestId("cardback-image");
    expect(firstCardBackImageCards).toHaveLength(16);
    const marioCards = screen.queryAllByTestId("mario");
    expect(marioCards).toHaveLength(2);
    const luigiCards = screen.queryAllByTestId("luigi");
    expect(luigiCards).toHaveLength(2);
    fireEvent.click(marioCards[0]);
    const marioImage = screen.queryAllByTestId("mario-image");
    expect(marioImage).toHaveLength(1);
    expect(screen.queryAllByTestId("cardback-image")).toHaveLength(15);
    fireEvent.click(luigiCards[0]);
    const luigiImage = screen.queryAllByTestId("luigi-image");
    expect(screen.queryAllByTestId("cardback-image")).toHaveLength(14);
    jest.advanceTimersByTime(100000);
    expect(screen.queryAllByTestId("cardback-image")).toHaveLength(16);
    jest.useRealTimers();
  });

  it("should keep pairs shown", () => {
    process.env.REACT_APP_USE_MOCK_DATA = "true";
    const firstCardBackImageCards = screen.queryAllByTestId("cardback-image");
    expect(firstCardBackImageCards).toHaveLength(16);
    const marioCards = screen.queryAllByTestId("mario");
    expect(marioCards).toHaveLength(2);
    fireEvent.click(marioCards[0]);
    const marioImage = screen.queryAllByTestId("mario-image");
    expect(marioImage).toHaveLength(1);
    fireEvent.click(marioCards[1]);
    expect(screen.queryAllByTestId("mario-image")).toHaveLength(2);
    expect(screen.queryAllByTestId("cardback-image")).toHaveLength(14);
  });

  it("should clear the screen of cards once all matches have been made successfully", () => {
    process.env.REACT_APP_USE_MOCK_DATA = "true";
    jest.useFakeTimers();
    //Show cards
    // act(() => {
    const cardBackImageCards = screen.queryAllByTestId("cardback-image");
    expect(cardBackImageCards).toHaveLength(16);
    const catsOnCheeseCards = screen.queryAllByTestId("cats on cheese");
    expect(catsOnCheeseCards).toHaveLength(2);
    const chinaCards = screen.queryAllByTestId("china");
    expect(chinaCards).toHaveLength(2);
    const ganondorfCards = screen.queryAllByTestId("ganondorf");
    expect(ganondorfCards).toHaveLength(2);
    const marioCards = screen.queryAllByTestId("mario");
    expect(marioCards).toHaveLength(2);
    const mexicoCards = screen.queryAllByTestId("mexico");
    expect(mexicoCards).toHaveLength(2);
    const luigiCards = screen.queryAllByTestId("luigi");
    expect(luigiCards).toHaveLength(2);
    const operaCards = screen.queryAllByTestId("opera");
    expect(operaCards).toHaveLength(2);
    const zeldaCards = screen.queryAllByTestId("zelda");
    expect(zeldaCards).toHaveLength(2);
    for (let card of catsOnCheeseCards) {
      fireEvent.click(card);
    }

    for (let card of chinaCards) {
      fireEvent.click(card);
    }

    for (let card of ganondorfCards) {
      fireEvent.click(card);
    }

    for (let card of marioCards) {
      fireEvent.click(card);
    }

    for (let card of luigiCards) {
      fireEvent.click(card);
    }

    for (let card of mexicoCards) {
      fireEvent.click(card);
    }

    for (let card of operaCards) {
      fireEvent.click(card);
    }

    for (let card of zeldaCards) {
      fireEvent.click(card);
    }
    // });
    jest.advanceTimersByTime(10000);
    const matchingTableDiv = screen.getByTestId("matching-table-div");
    expect(matchingTableDiv).toBeInTheDocument();
  });
});
