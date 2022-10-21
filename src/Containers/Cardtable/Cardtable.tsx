import { FC, useState } from "react";
import { Card } from "../../Components/Card/Card";
import useDeckStore from "../../Store/deckStore";
import styled from "styled-components";

const StyledCardTable = styled.div`
  display: grid;
  grid-template-columns: max-content max-content max-content;
  border: solid;
  grid-gap: 1rem;
  width: fit-content;
  margin: auto;
  background-color: #663d00;
  background-image: url("https://www.transparenttextures.com/patterns/wood-pattern.png");
  padding: 2rem;
  margin-top: 2vh;
  perspective: 1000px;
`;

export const Cardtable: FC = () => {
  const { cardDeck } = useDeckStore();
  const memoryCards = () => {
    return cardDeck.map((el, index) => {
      return (
        <Card
          cardPromptText={el["prompt"]}
          artBase64String={el["artBase64"]}
          key={index}
          dataCardIndex={el["dataId"]}
          shown={el["shown"]}
          solved={el["solved"]}
        />
      );
    });
  };
  memoryCards();
  const componentJSX = cardDeck.length !== 0 ?  <StyledCardTable>{memoryCards()}</StyledCardTable> : null;
  return componentJSX;
};

export default Cardtable;
