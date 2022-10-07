import { FC, useState } from "react";
import { ICardtable } from "../../Interfaces/Cardtable";
import { Card } from "../../Components/Card/Card";
import useDeckStore from "../../Store/deckStore";
import styled from "styled-components";

const StyledCardTable = styled.div`
  display: grid;
  grid-template-columns: max-content max-content max-content max-content;
  border: solid;
  grid-gap: 1rem;
  width: fit-content;
  margin: auto;
`;

export const Cardtable: FC<ICardtable> = (cardArtObjects) => {
  const cardDeck = useDeckStore((state) => state.cardDeck);
  const memoryCards = () => {
    console.log("cardDeck bitch", cardDeck);
    return cardDeck.map((el, index) => {
      return (
        <Card
          cardPromptText={el['prompt']}
          artBase64String={el["artBase64"]}
          key={index}
        />
      );
    });
  };
  memoryCards();
  return <StyledCardTable>{memoryCards()}</StyledCardTable>;
};

export default Cardtable;
