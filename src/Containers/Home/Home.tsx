import styled from "styled-components";

const StyledH1 = styled.h1`
  @keyframes introRotate {
    0% {
      transform: rotateX(90deg);
      transform: rotateY(90deg);
    }
    100% {
      transform: rotateX(359deg);
      transform: rotateY(359deg);
    }
  }
  font-family: Kirby;
  text-align: center;
  animation-name: introRotate;
  animation-duration: 2s;

`;

export const Home = () => {
  return (
    <>
      <StyledH1>Welcome to AI Memory!</StyledH1>
      <strong>To begin, click the 'Game' button.</strong>
      <br/>
      <span>
        In this game, you'll define prompts for an AI to make art from, which
        will then be used in cards for a game of memory!
      </span>
      <span>
        Once you complete the game, you then have to match up the card-art with
        the prompt
      </span>
      <br/>
      <br/>
      <i>Future updates will include:</i>
      <ul>
        <li>Speedier art generation time</li>
        <li>Account creation and log in</li>
        <li>Archiving of generated art in a database to speed up the load time</li>
      </ul>
    </>
  );
};

export default Home;
