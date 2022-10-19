import { FC, useState } from "react";
import useDeckStore from "../../Store/deckStore";
import { Card as MatCard } from "@mui/material";
import { ICard } from "../../Interfaces/Card";
import styled from "styled-components";
import StartPattern from "../../Assets/Images/starPattern.jpeg";

interface imgProps {
  opacityAmount: number;
}

interface cardWrapperDivProps {
  borderStyle: string;
}

const StyledMaterialUICard = styled(MatCard)`
  width: fit-content;
  height: inherit;
`;

const StyledCardWrapperDiv = styled.div<cardWrapperDivProps>`
  @keyframes cardFlip {
    0% {transform: rotate3d(1, 1, 1, 0deg);}
    50% { transform: rotate3d(1, 1, 1, 180deg);}
    100% {transform: rotate3d(1, 1, 1, 0deg);}
  }

  width: fit-content;
  height: 20vw;
  min-width: 20vw;
  transition: border 2s;
  border: ${(props) => props.borderStyle}
  
`;

const StyledImageTag = styled.img<imgProps>`

  width: 20vw;
  height: 20vw;
  transition: all 1s;
  opacity: ${(props) => props.opacityAmount}; 
  &:active {
    @keyframes cardFlip {
      0% {transform: rotate3d(1, 1, 1, 0deg);}
      50% { transform: rotate3d(1, 1, 1, 180deg);}
      100% {transform: rotate3d(1, 1, 1, 0deg);}
    }
    animation-name: cardFlip;
    animation-duration: .5s;
  }
`;

const StyledHiddenStrongText = styled.strong`
  position: absolute;
  visibility: hidden;
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
  const cardPattern = StartPattern;
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
    <StyledImageTag
      opacityAmount={shown ? 1 : 0.85}
      className="card-image-tag"
      src={imageToShow}
      data-testid={
        shown ? `${cardPromptText.toLowerCase()}-image` : "cardback-image"
      }
    />
  ) : null;
  return (
    <>
      <StyledCardWrapperDiv
        onClick={toggleCard}
        borderStyle={solved ? "green solid 2px" : ""}
      >
        <StyledMaterialUICard>
          <StyledHiddenStrongText data-testid={cardPromptText.toLowerCase()}>
            {cardPromptText}
          </StyledHiddenStrongText>
          {imgTag}
        </StyledMaterialUICard>
      </StyledCardWrapperDiv>
    </>
  );
};

export default Card;
