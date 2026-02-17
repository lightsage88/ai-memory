import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import * as Styled from '../../Component-Lib/Container/styled';

export const Home = () => {
    return (
        <Styled.Container>
            <h1>Welcome to AI Memory!</h1>
            <strong>Test your memory with AI-Generated Images!</strong>
            <Button variant="contained" component={Link} to="/game">
                Play Game
            </Button>
        </Styled.Container>
    )
}

export default Home;