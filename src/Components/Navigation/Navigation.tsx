import { Box, Link } from '@mui/material';
import StyledComponents from '../../StyledComponents/StyledComponents';


export const Navigation = () => {
    return (
        <Box sx={{
            border: '3px #007aaf solid'
        }}>
            <StyledComponents.StyledNavLink href="/">Home</StyledComponents.StyledNavLink>
            <StyledComponents.StyledNavLink href="/game">Game</StyledComponents.StyledNavLink>
            <StyledComponents.StyledNavLink>About</StyledComponents.StyledNavLink>
        </Box>
    )
}

export default Navigation;