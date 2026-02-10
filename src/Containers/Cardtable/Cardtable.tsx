import { FC, useState } from "react";
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

export const Cardtable: FC = () => {
  const cardDeck = useDeckStore((state) => state.cardDeck);
  const memoryCards = () => {
    return cardDeck.map((el, index) => {
      const { dataId, image_url, promptText, shown, solved } = el;
      return (
        <Card
          cardPromptText={promptText}
          imageUrl={image_url}
          key={index}
          dataCardIndex={dataId}
          shown={shown}
          solved={solved}
        />
      );
    });
  };
  memoryCards();
  return <StyledCardTable>{memoryCards()}</StyledCardTable>;
};

export default Cardtable;
