import "@testing-library/jest-dom";
// import { render as reactDomRender } from "react-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AppWrapper from "../AppWrapper";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
describe("The App", () => {
  beforeEach(() => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <AppWrapper />
      </Router>
    );
  });

  it("should open the app and offer a greeting and directions", () => {
    const greeting = screen.getByText(/welcome to ai memory!/i);
    const directions = screen.getByText(/to begin, click the 'game' tab./i);
    expect(greeting.textContent).toBe("Welcome to AI Memory!");
    expect(directions.textContent).toBe("To begin, click the 'Game' tab.");
  });

  it("should display some navigational tabs at the top", () => {
    const homeTab = screen.getByTestId("home-tab");
    const gameTab = screen.getByTestId("game-tab");
    const aboutTab = screen.getByTestId("about-tab");
    expect(homeTab.textContent).toBe("Home");
    expect(gameTab.textContent).toBe("Game");
    expect(aboutTab.textContent).toBe("About");
  });

  it("should take us to the game screen when the gameTab is clicked", async () => {
    const user = userEvent.setup();
    const gameTab = screen.getByTestId("game-tab");
    await user.click(gameTab);
    // const gameDirections = screen.getByRole("heading", {
    //   name: /enter 8 descriptions for the ai to make pictures from\./i,
    // });
    const gameInstructions = screen.getByText(/enter 8 descriptions for the ai to make pictures from\./i);
    expect(gameInstructions).toBeInTheDocument();
  });
});
