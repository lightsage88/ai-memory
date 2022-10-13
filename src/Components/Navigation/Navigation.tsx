import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import StyledComponents from "../../StyledComponents/StyledComponents";

export const Navigation = () => {
  return (
    <Box
      sx={{
        border: "3px #007aaf solid",
        display: "flex",
      }}
    >
      <Link data-testid="home-tab" to="/">
        Home
      </Link>

      <Link
        data-testid="game-tab"
        to="/game"
      >
        Game
      </Link>
      <StyledComponents.StyledNavLink data-testid="about-tab">
        About
      </StyledComponents.StyledNavLink>
    </Box>
  );
};

export default Navigation;
