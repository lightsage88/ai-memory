import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import StyledComponents from "../../StyledComponents/StyledComponents";
import useDeckStore from "../../Store/deckStore";
import usePromptStore from "../../Store/promptStore";

export const Navigation = () => {
  const { clearDeck } = useDeckStore();
  const { clearPromptArray } = usePromptStore();

  /**
   * This method calls the deckStore-method 'clearDeck', which resets the deck of cards that are in the game's memory
   * and clears the prompts in the prompt store.
   */
  const resetGamePrompts = () => {
    clearDeck();
    clearPromptArray();
  };

  return (
    <StyledComponents.StyledBox>
      <Link data-testid="home-tab" to="/" onClick={() => resetGamePrompts()}>
        Home
      </Link>

      <Link data-testid="game-tab" to="/game">
        Game
      </Link>
      {/* <StyledComponents.StyledNavLink
        data-testid="about-tab"
        onClick={() => resetGamePrompts()}
      >
        About
      </StyledComponents.StyledNavLink> */}
    </StyledComponents.StyledBox>
  );
};

export default Navigation;
