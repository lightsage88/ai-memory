import { FC, useState } from "react";
import useDeckStore from "../../Store/deckStore";
import { Card as MatCard } from "@mui/material";
import { ICard } from "../../Interfaces/Card";
import styled from "styled-components";
import StartPattern from "../../Assets/Images/starPattern.jpeg";

const StyledMaterialUICard = styled(MatCard)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledCardWrapperDiv = styled.div`
  width: 256px;
  height: 256px;
  min-width: 256px;
`;

const StyledFlipCard = styled.div`
  background-color: transparent;
  width: 256px;
  height: 256px;
  perspective: 1000px;
`;

const StyledFlipCardInner = styled.div<{ $flipped: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transform: ${({ $flipped }) => ($flipped ? "rotateY(180deg)" : "none")};
`;

const StyledFlipCardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
`;

const StyledFlipCardBack = styled(StyledFlipCardFace)`
  transform: rotateY(180deg);
`;

const StyledImageTag = styled.img`
  width: 100%;
  height: 100%;
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
  const { imageUrl, image, cardPromptText, shown, solved, dataCardIndex } =
    cardData;
  // Use image URL if available, otherwise use base64
  const cardImage = imageUrl;
  const cardPattern = StartPattern;
  const isFlipped = shown || solved;
  const toggleCard = () => {
    if (!shown) {
      showCardViaDataCardIndex(cardData.dataCardIndex);
      setTimeout(() => {
        hideUnsolvedCardsMatches();
        checkIfMemoryIsComplete();
      }, 900);
    }
  };
  const frontImgTag = cardPattern ? (
    <StyledImageTag
      className="card-image-tag"
      src={cardPattern}
      data-testid={!isFlipped ? "cardback-image" : undefined}
    />
  ) : null;
  const backImgTag = cardImage ? (
    <StyledImageTag
      className="card-image-tag"
      src={cardImage}
      data-testid={isFlipped ? `${cardPromptText.toLowerCase()}-image` : undefined}
    />
  ) : null;
  return (
    <>
      <StyledCardWrapperDiv onClick={toggleCard}>
        <StyledFlipCard>
          <StyledFlipCardInner $flipped={isFlipped}>
            <StyledFlipCardFace>
              <StyledMaterialUICard>
                {frontImgTag}
              </StyledMaterialUICard>
            </StyledFlipCardFace>
            <StyledFlipCardBack>
              <StyledMaterialUICard>
                <StyledHiddenStrongText data-testid={cardPromptText.toLowerCase()}>
                  {cardPromptText}
                </StyledHiddenStrongText>
                {backImgTag}
              </StyledMaterialUICard>
            </StyledFlipCardBack>
          </StyledFlipCardInner>
        </StyledFlipCard>
      </StyledCardWrapperDiv>
    </>
  );
};

export default Card;
