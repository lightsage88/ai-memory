import { FC, useState } from "react";
import useDeckStore from "../../Store/deckStore";
import { Card as MatCard } from "@mui/material";
import { ICard } from "../../Interfaces/Card";
import styled from "styled-components";
const startPattern = require("../../Assets/Images/starPattern.jpg");

const StyledMaterialUICard = styled(MatCard)`
  width: fit-content;
`;

const StyledCardWrapperDiv = styled.div`
  width: fit-content;
  height: 256px;
  min-width: 256px;
`;

const StyledImageTag = styled.img`
  width: 256px;
  height: 256px;
`;

export const Card: FC<ICard> = (cardData) => {
  const cardDeck = useDeckStore((state) => state.cardDeck);
  const showCardViaDataCardIndex = useDeckStore(
    (state) => state.showCardViaDataCardIndex
  );
  const hideUnsolvedCardsMatches = useDeckStore(
    (state) => state.hideUnsolvedCardsMatches
  );
  const checkIfMemoryIsComplete = useDeckStore(
    (state) => state.checkIfMemoryIsComplete
  );
  const { artBase64String, cardPromptText, shown, solved, dataCardIndex } =
    cardData;
  const cardImage = `data:image/jpeg;base64, ${artBase64String}`;
  const cardPattern = startPattern;
  const imageToShow = shown ? cardImage : cardPattern;
  const toggleCard = () => {
    if (!shown) {
      showCardViaDataCardIndex(cardData.dataCardIndex);
      setTimeout(() => {
        hideUnsolvedCardsMatches();
        checkIfMemoryIsComplete();
      }, 900);
    }
  };
  const imgTag = artBase64String ? (
    <StyledImageTag className="card-image-tag" src={imageToShow} />
  ) : null;
  return (
    <>
      <StyledCardWrapperDiv onClick={toggleCard}>
        <StyledMaterialUICard>
          <strong>{cardPromptText}</strong>
          {imgTag}
        </StyledMaterialUICard>
      </StyledCardWrapperDiv>
    </>
  );
};

export default Card;
